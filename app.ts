import { config } from 'dotenv';
import express = require('express');

config();
const app = express();
const PORT = process.env.PORT;

// Router
import indexRouter from './src/routes/index';

// JWT token Middleware
import cookieParser = require('cookie-parser');
app.use(cookieParser(''));

// Middleware Setting
app.use(express.json());
app.use(express.static('public'));
app.use('/', indexRouter);

// PORT
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

export default app;
export { PORT };
