import * as express from 'express';
import * as path from 'path';
const cors = require('cors');

import userRouter from './user';
import communityRouter from './community';
import studyRouter from './study';
import studyFeedbackRouter from './study_feedback';

const router = express.Router();
const indexPath = path.join(__dirname, '../pages');

router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // 토큰 에러 테스트
    optionsSuccessStatus: 200,
    exposedHeaders: ['Access-Control-Allow-Origin'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // 토큰 에러 테스트
  }),
);

router.use(express.json());
router.use(express.static(indexPath));
router.use('/api/user', userRouter);
router.use('/api/community', communityRouter);
router.use('/api/study', studyRouter);
router.use('/api/feedback', studyFeedbackRouter);

export default router;
