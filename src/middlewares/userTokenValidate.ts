import { User } from '../models/index';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;

const userTokenValidate = async (req: any, res: any, next: any) => {
  // console.log('미들웨어 실행!');

  // const payload = {
  //     user_id: findUser._id,          // 사용자의 MongoDB ObjectID
  // }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      resultCode: '401',
      message: '토큰이 없습니다.',
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // 토큰이 유효한 경우
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') {
      // 토큰이 유효하지 않은 경우
      return res.status(401).json({
        resultCode: '401',
        message: '유효하지 않은 토큰입니다.',
      });
    } else if (err.name === 'TokenExpiredError') {
      // 토큰이 만료된 경우
      return res.status(401).json({
        resultCode: '401',
        message: '만료된 토큰입니다.',
      });
    } else {
      // 기타 토큰 검증 실패
      return res.status(500).json({
        resultCode: '500',
        message: '서버 오류',
      });
    }
  }
};

export default userTokenValidate;
