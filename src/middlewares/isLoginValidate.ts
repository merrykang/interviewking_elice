import { User } from '../models/index';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

import jwt from 'jsonwebtoken';
interface JwtPayload {
  user_id: any;
  // 다른 필요한 속성들도 추가할 수 있습니다.
}
import bcrypt from 'bcrypt';

const secretKey = process.env.SECRET_KEY;
import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
  user?: string;
}

const isLoginValidate = async (req: CustomRequest, res: Response) => {
  try {
    console.log('로그인 유효성 검사 테스트!');
    const { token } = req.body;
    console.log(token + '/ userAPI');

    if (!token) {
      return res.status(401).json({
        resultCode: '401',
        message: '토큰이 없습니다. / 로그아웃상태',
      });
    }
    if (!secretKey) {
      throw new Error('Secret key is undefined');
    }

    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // 토큰이 유효한 경우
    // req.user = decoded;
    // if (!req.user) {
    //   throw new Error('Decoded user is undefined');
    // }

    return res.status(200).json({
      resultCode: '200',
      message: '로그인 상태',
      data: {
        user_id: decoded.user_id,
        token: token,
      },
    });
  } catch (err) {
    if ((err as Error).name === 'JsonWebTokenError') {
      // 토큰이 유효하지 않은 경우
      return res.status(401).json({
        resultCode: '401',
        message: '유효하지 않은 토큰입니다. / 로그아웃상태',
      });
    } else if ((err as Error).name === 'TokenExpiredError') {
      // 토큰이 만료된 경우
      return res.status(401).json({
        resultCode: '401',
        message: '만료된 토큰입니다. / 로그아웃상태',
      });
    } else {
      // 기타 토큰 검증 실패
      return res.status(500).json({
        resultCode: '500',
        message: '서버 오류 / 로그아웃상태',
      });
    }
  }
};

export default isLoginValidate;
