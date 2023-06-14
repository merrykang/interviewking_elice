// const { Router } = require('express');
// const router = Router();
import express from 'express';
const router = express.Router();

// middleware
import userTokenValidate from '../middlewares/userTokenValidate';

import userApi from '../apis/user';

// user API 테스트
router.get('/userInfo', userApi.getAllUserInfo);

// user API 실제 기능
router.post('/register', userApi.registerUser);
router.post('/login', userApi.loginUser);
router.get('/mypage', userTokenValidate, userApi.getUserInfo);
router.put('/mypage', userTokenValidate, userApi.modifyUserInfo);
router.delete('/mypage', userTokenValidate, userApi.deleteUser);
router.post('/logout', userTokenValidate, userApi.logoutUser);

export default router;
