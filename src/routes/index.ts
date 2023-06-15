import express, { Router } from 'express';
import path from 'path';
import cors from 'cors';

import userRouter from './user';
import communityRouter from './community';
import studyRouter from './study';
import studyFeedbackRouter from './study_feedback';

const router: Router = express.Router();
const indexPath: string = path.join(__dirname, "../pages");

router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ['Access-Control-Allow-Origin'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

router.use(express.json());
router.use(express.static(indexPath));
router.use('/api/user', userRouter);
router.use('/api/community', communityRouter);
router.use('/api/study', studyRouter);
router.use('/api/feedback', studyFeedbackRouter);

export default router;
