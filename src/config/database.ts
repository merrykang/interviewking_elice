import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const DB_Link = process.env.DB_Link;
if (!DB_Link) {
  throw new Error('DB_Link environment variable is not defined');
}

// DB 연결
mongoose
  .connect(DB_Link, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10초
    socketTimeoutMS: 45000, // 45초
    family: 4, // IPv4
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err: any) => console.log(err));

export default mongoose;
