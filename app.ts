import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './src/routes/index';

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT;

// JWT token Middleware
app.use(cookieParser());

// Middleware Setting
app.use(express.json());
app.use(express.static('public'));
app.use('/', indexRouter);

// PORT
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

export default app;
