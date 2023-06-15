"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { Router } = require('express');
// const router = Router();
var express_1 = require("express");
var router = (0, express_1.Router)();
// middleware
var userTokenValidate_1 = require("../middlewares/userTokenValidate");
var user_1 = require("../apis/user");
// CustomRequest, CustomResponse 매개 변수와 형식 맞추어주는 미들웨어
var adaptRequest = function (handler) {
    return function (req, res, next) {
        var customReq = req;
        handler(customReq, res, next);
    };
};
// user API 테스트
router.get('/userInfo', user_1.userApi.getAllUserInfo);
// user API 실제 기능
router.post('/register', user_1.userApi.registerUser);
router.post('/login', user_1.userApi.loginUser);
router.get('/mypage', userTokenValidate_1.default, user_1.userApi.getUserInfo);
router.put('/mypage', userTokenValidate_1.default, adaptRequest(user_1.userApi.modifyUserInfo));
router.delete('/mypage', userTokenValidate_1.default, adaptRequest(user_1.userApi.deleteUser));
router.post('/logout', userTokenValidate_1.default, adaptRequest(user_1.userApi.logoutUser));
exports.default = router;
