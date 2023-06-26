import { Router, RequestHandler } from 'express';
import { CustomRequest, CustomResponse, studyApi } from '../apis/study';
import { Request, Response, NextFunction } from 'express';
import userTokenValidate from '../middlewares/userTokenValidate';
import tokenValidate from '../middlewares/tokenValidate';

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
  adaptRequest(studyApi.newStudy),
);
router.post(
  '/apply',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(studyApi.applyStudy),
);
router.put(
  '/accept/:study_id/:member_id',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(studyApi.acceptStudy),
);
router.get('/accept/:study_id/:accept', adaptRequest(studyApi.acceptRelation));
router.get('/info', adaptRequest(studyApi.getStudy));
router.get('/info/:study_id', adaptRequest(studyApi.getStudyOne));
router.put(
  '/info/:study_id',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(studyApi.updateStudy),
);
router.delete(
  '/',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(studyApi.leaveUser),
);
router.delete(
  '/:study_id/:member_id',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(studyApi.deleteUser),
);
router.delete(
  '/:study_id',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(studyApi.deleteStudy),
);

export default router;
