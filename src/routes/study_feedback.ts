import { Router } from 'express';
import studyFeedbackApi from '../apis/study_feedback';
import userTokenValidate from '../middlewares/userTokenValidate';

const router = Router();

router.post('/create', userTokenValidate, studyFeedbackApi.newFeedback); // 피드백 게시글, 댓글 작성
router.get('/:study_id', studyFeedbackApi.studyFeedback); // 피드백 게시글, 댓글 조회(스터디별)
router.get('/', studyFeedbackApi.userFeedback); // 피드백 게시글, 댓글 조회
router.put('/', userTokenValidate, studyFeedbackApi.updateFeedback); // 피드백 게시글, 댓글 수정
router.delete('/:study_id', userTokenValidate, studyFeedbackApi.deleteFeedback); // 피드백 게시글, 댓글 삭제

export default router;
s;
