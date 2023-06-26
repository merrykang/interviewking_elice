import { Router, RequestHandler } from 'express';
import { CustomRequest, CustomResponse, studyFeedbackApi } from '../apis/study_feedback';
import userTokenValidate from '../middlewares/userTokenValidate';
import tokenValidate from '../middlewares/tokenValidate';
import { Request, Response, NextFunction } from 'express';

const router = Router();

// CustomRequest, CustomResponse 매개 변수와 형식 맞추어주는 미들웨어
const adaptRequest = (
  handler: (req: CustomRequest, res: CustomResponse, next: NextFunction) => Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const customReq: CustomRequest = req as CustomRequest;
    handler(customReq, res as unknown as CustomResponse, next);
  };
};

// 구체적인 라우터 설정
router.post(
  '/create',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(studyFeedbackApi.newFeedback),
);
router.get('/:study_id', adaptRequest(studyFeedbackApi.studyFeedback));
router.get('/', adaptRequest(studyFeedbackApi.allFeedback));
router.put(
  '/',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(studyFeedbackApi.updateFeedback),
);
router.delete(
  '/:study_id',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(studyFeedbackApi.deleteFeedback),
);

export default router;
