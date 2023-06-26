import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config({ path: '../../env' });
const accessKeyId: string = process.env.AWS_ACCESS || '';
const secretAccessKey: string = process.env.AWS_SECRET || '';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  endpoint: 'https://s3.ap-northeast-2.amazonaws.com',
});

export default s3;
