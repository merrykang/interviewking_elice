import { Router, RequestHandler } from 'express';
const router = Router();

// middleware
import userTokenValidate from '../middlewares/userTokenValidate';
import { CustomRequest, userApi } from '../apis/user';
import isLoginValidate from '../middlewares/isLoginValidate';
import { Request, Response, NextFunction } from 'express';

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
router.get('/login', isLoginValidate);
router.get('/userInfo/:user_id', adaptRequest(userApi.getUserIdInfo));
router.post('/register', adaptRequest(userApi.registerUser));
router.post('/login', adaptRequest(userApi.loginUser));
router.get('/mypage', adaptRequest(userApi.getUserInfo));
router.put(
  '/mypage',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(userApi.modifyUserInfo),
);
router.delete(
  '/mypage',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(userApi.deleteUser),
);
router.post(
  '/logout',
  userTokenValidate as unknown as RequestHandler,
  adaptRequest(userApi.logoutUser),
);

export default router;
