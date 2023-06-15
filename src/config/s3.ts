import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config({ path: '../../env' });

/** S3 연결 */
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS;
const secretAccessKey = process.env.AWS_SECRET;
if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error('Required AWS environment variables are not defined');
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  endpoint: 'https://s3.ap-northeast-2.amazonaws.com',
});

export default s3;
