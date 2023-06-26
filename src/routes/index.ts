import express from 'express';
import path from 'path';
import cors from 'cors';

import userRouter from './user';
import communityRouter from './community';
import studyRouter from './study';
import studyFeedbackRouter from './study_feedback';

const router = express.Router();
const indexPath = path.join(__dirname, '../pages');

router.use(cors());
router.use(express.json());
router.use(express.static(indexPath));
router.use('/api/user', userRouter);
router.use('/api/community', communityRouter);
router.use('/api/study', studyRouter);
router.use('/api/feedback', studyFeedbackRouter);

export default router;
