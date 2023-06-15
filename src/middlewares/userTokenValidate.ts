import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../models';

import express from 'express';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

import bcrypt from 'bcrypt';

const secretKey = process.env.SECRET_KEY;

interface AuthenticatedRequest extends Request {
  user_id?: any,
  user: any
}

const userTokenValidate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // console.log('미들웨어 실행!');

  // 쿠키값 사용 주석 처리
  // const token = req.cookies.token;

  // json body (localStorage 값 사용)
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      resultCode: "401",
      message: "토큰이 없습니다."
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey as Secret) as { user: typeof User };
    
    // 토큰이 유효한 경우
    req.user = decoded.user;
    next();
  } catch (err) {
    if ((err as Error).name === 'JsonWebTokenError') {
      // 토큰이 유효하지 않은 경우
      return res.status(401).json({
        resultCode: "401",
        message: "유효하지 않은 토큰입니다."
      });
    } else if ((err as Error).name === 'TokenExpiredError') {
      // 토큰이 만료된 경우
      return res.status(401).json({
        resultCode: "401",
        message: "만료된 토큰입니다."
      });
    } else {
      // 기타 토큰 검증 실패
      return res.status(500).json({
        resultCode: "500",
        message: "서버 오류"
      });
    }
  }
};

export default userTokenValidate;
