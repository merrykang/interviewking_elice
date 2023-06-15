// const { Router } = require('express');
// const router = Router();
import { Router } from 'express';
const router = Router();

// middleware
import userTokenValidate from '../middlewares/userTokenValidate';

import { CustomRequest, userApi } from '../apis/user';
import { Request, Response, NextFunction } from 'express';

// CustomRequest, CustomResponse 매개 변수와 형식 맞추어주는 미들웨어
const adaptRequest = (
  handler: (
    req: CustomRequest,
    res: Response<any, Record<string, any>>,
    next: NextFunction,
  ) => Promise<Response<any, Record<string, any>> | undefined>,
) => {
  return (req: Request, res: Response<any, Record<string, any>>, next: NextFunction) => {
    const customReq: CustomRequest = req as CustomRequest;
    handler(customReq, res, next);
  };
};

// user API 테스트
router.get('/userInfo', userApi.getAllUserInfo);

// user API 실제 기능
router.post('/register', userApi.registerUser);
router.post('/login', userApi.loginUser);
router.get('/mypage', userTokenValidate, userApi.getUserInfo);
router.put('/mypage', userTokenValidate, adaptRequest(userApi.modifyUserInfo));
router.delete('/mypage', userTokenValidate, adaptRequest(userApi.deleteUser));
router.post('/logout', userTokenValidate, adaptRequest(userApi.logoutUser));

export default router;
