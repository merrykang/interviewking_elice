import mongoose from 'mongoose';
const dbLink = process.env.DB_Link;
if (!dbLink) {
  throw new Error('DB_Link environment variable is not defined');
}

// DB 연결
mongoose
  .connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10초
    socketTimeoutMS: 45000, // 45초
    family: 4, // IPv4
  } as mongoose.ConnectOptions)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err));

export default mongoose;
