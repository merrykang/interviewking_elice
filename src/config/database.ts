import mongoose, { ConnectOptions } from 'mongoose';

const dbLink = process.env.DB_Link || ''; // 기본값으로 빈 문자열 사용

// DB 연결
const connectOptions: ConnectOptions = {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // 10초
  socketTimeoutMS: 45000, // 45초
  family: 4, // IPv4
};

mongoose
  .connect(dbLink, connectOptions)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err));

export default mongoose;
