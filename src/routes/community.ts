import { Router, RequestHandler } from 'express';
import { CustomRequest, communityApi } from '../apis/community';
import { Request, Response, NextFunction } from 'express';
import fileUpload from '../middlewares/fileUpload';
import fileDownload from '../middlewares/fileDownload';
import fileModify from '../middlewares/fileModify';
import userTokenValidate from '../middlewares/userTokenValidate';

const router = Router();

// CustomRequest, CustomResponse 매개 변수와 형식 맞추어주는 미들웨어
const adaptRequest = (
  handler: (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ) => Promise<Response<any, Record<string, any>> | undefined>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const customReq: CustomRequest = req as CustomRequest;
    handler(customReq, res as Response, next);
  };
};

// 구체적인 라우터 설정
router.get('/list', adaptRequest(communityApi.getAllList));
router.post('/detl', fileUpload, adaptRequest(communityApi.postContent));
router.get('/detl', communityApi.getContent);
router.put(
  '/detl',
  userTokenValidate as unknown as RequestHandler,
  fileModify,
  adaptRequest(communityApi.modifyContent),
);
router.delete(
  '/detl',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(communityApi.deleteContent),
);
router.post('/reply', communityApi.postReply);
router.put(
  '/reply',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(communityApi.modifyReply),
);
router.delete(
  '/reply',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(communityApi.deleteReply),
);
//router.get('/download', fileDownload, communityApi.fileDownload);

export default router;
