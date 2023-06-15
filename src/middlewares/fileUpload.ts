import { Router } from 'express';
import multer from 'multer';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import moment from 'moment';
import s3 from '../config/s3';

const router = Router();

/** 파일 업로드 */
async function fileUpload(req: any, res: any, next: any) {
  try {
    /** 서버로 업로드 */
    const storage = multer.memoryStorage();
    const uploadMiddleware = multer({ storage }).single('file');

    /** 서버에서 S3로 업로드 */
    uploadMiddleware(req, res, async err => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: '파일업로드 실패' });
        return;
      }

      /** 첨부파일이 없는 경우 */
      if (!req.file) {
        next();
        return;
      }

      const fileStream = Readable.from(req.file.buffer);
      const datetime = moment().format('YYYYMMDDHHmmss');
      const key = `${req.body.dir}/${datetime}_${req.file.originalname}`;

      const params = {
        Bucket: '13team',
        Key: key,
        Body: fileStream,
        ContentLength: req.file.size,
      };

      const command = new PutObjectCommand(params);
      const response = await s3.send(command);

      if (response) {
        req.file_etag = response.ETag;
        req.file_name = req.file.originalname;
        req.file_key = key;
        next();
      } else {
        res.end();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: '파일업로드 실패' });
  }
}

export default fileUpload;
