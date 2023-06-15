import { Router } from 'express';
import { CustomRequest, CustomResponse, studyFeedbackApi } from '../apis/study_feedback';
import userTokenValidate from '../middlewares/userTokenValidate';
import { Request, Response, NextFunction } from 'express';

// CustomRequest, CustomResponse 매개 변수와 형식 맞추어주는 미들웨어
const adaptRequest = (
  handler: (req: CustomRequest, res: CustomResponse, next: NextFunction) => Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const customReq: CustomRequest = req as CustomRequest;
    handler(customReq, res as CustomResponse, next);
  };
};

const router = Router();
// router.use(userTokenValidate);

router.post('/create', userTokenValidate, adaptRequest(studyFeedbackApi.newFeedback)); // 피드백 게시글, 댓글 작성
router.get('/:study_id', adaptRequest(studyFeedbackApi.studyFeedback)); // 피드백 게시글, 댓글 조회(스터디별)
router.get('/', adaptRequest(studyFeedbackApi.userFeedback)); // 피드백 게시글, 댓글 조회
router.put('/', userTokenValidate, adaptRequest(studyFeedbackApi.updateFeedback)); // 피드백 게시글, 댓글 수정
router.delete('/:study_id', userTokenValidate, adaptRequest(studyFeedbackApi.deleteFeedback)); // 피드백 게시글, 댓글 삭제

export default router;
