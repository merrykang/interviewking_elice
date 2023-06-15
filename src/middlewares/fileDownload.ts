import { Router } from 'express';
import { Community } from '../models';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/s3';
import { Readable } from 'stream';

const router = Router();
import { Request, Response, NextFunction } from 'express';

/** 파일 다운로드 */
async function fileDownload(req: Request, res: Response, next: NextFunction) {
  try {
    /** 클라이언트에서 요청한 파일 찾기 */
    const reqNo = req.query.community_no;
    const reqContent = await Community.find({ community_no: reqNo });

    const key = reqContent[0].file_key;
    const etag = reqContent[0].file_etag;

    /** S3에서 다운로드할 파일 가져오기 */
    const downloadFile = async (key: any, etag: any) => {
      const params = {
        Bucket: '13team',
        Key: key,
        IfMatch: etag,
      };

      const command = new GetObjectCommand(params);
      const response = await s3.send(command);

      /** 파일 데이터를 버퍼로 읽기 */
      const fileData = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        if (!response.Body) {
          reject(new Error('Response body is undefined'));
        } else {
          const PassThroughStream = response.Body as Readable;
          PassThroughStream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
          PassThroughStream.on('end', () => resolve(Buffer.concat(chunks)));
          PassThroughStream.on('error', reject);
        }
      });

      /** 클라이언트에 전달할 파일 구성 */
      const contentType = response.ContentType;
      let contentDisposition = 'attachment';

      if (response.Metadata && response.Metadata.filename) {
        contentDisposition += `; filename=${response.Metadata.filename}`;
      }

      res.set('Content-Type', contentType);
      res.set('Content-Disposition', contentDisposition);

      return {
        fileData,
        contentType,
        contentDisposition,
      };
    };

    /** Key와 ETag 값으로 S3 내의 파일 요청 */
    const fileData = await downloadFile(key, etag);

    if (fileData) {
      const { fileData: downloadedData, contentType, contentDisposition } = fileData;
      res.set('Content-Type', contentType);
      res.set('Content-Disposition', contentDisposition);
      res.send(downloadedData);
    } else {
      res.end(); // 파일이 존재하지 않을 경우 응답 종료
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: '파일 다운로드 실패' });
  }
}

export default fileDownload;
