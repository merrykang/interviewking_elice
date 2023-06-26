import { User } from '../models/index';

import express from 'express';
import bodyParser from 'body-parser';
const app = express();

import mongoose from 'mongoose';
const {
  Types: { ObjectId },
} = mongoose;

import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = process.env.SECRET_KEY;
import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
  user: any;
}

export const userTokenValidate = async (req: CustomRequest, res: Response, next: NextFunction) => {
  // console.log('미들웨어 실행!');

  // 쿠키값 사용 주석 처리
  // const token = req.cookies.token;

  // json body (localStorage 값 사용)
  const { token } = req.body;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      resultCode: '401',
      message: '토큰이 없습니다.',
    });
  }

  try {
    if (!secretKey) {
      throw new Error('Secret key is undefined');
    }
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // 토큰이 유효한 경우
    req.user = decoded;
    // console.log(decoded.user_id);
    // console.log(req.user.user_id);

    // TO-DO: 현재 사용자 검사 (isLoginValidate 의 user_id 와 비교해서 안되면 팅겨버리는 로직 추가하자)

    // 현재 사용자 검사(기본) -> 이렇게 하면 다른곳에서도 currentUser 정보를 사용할 수 있겠네.. !
    // response값을 더 줘서 값을 활용 많이하계끔해야하나?
    // const currentUser = await User.findOne({ "_id": user_id });

    // if (!currentUser) {
    //   return res.status(400).json({
    //       resultCode: "400",
    //       message: "해당 사용자를 찾을 수 없습니다."
    //   });
    // }

    // if (currentUser) {
    //     return res.status(400).json({
    //         resultCode: "400",
    //         message: "사용자 정보가 존재합니다.",
    //         data: {
    //             user_id: currentUser._id
    //         }
    //     });
    // }
    next();
  } catch (err) {
    if ((err as Error).name === 'JsonWebTokenError') {
      // 토큰이 유효하지 않은 경우
      return res.status(401).json({
        resultCode: '401',
        message: '유효하지 않은 토큰입니다.',
      });
    } else if ((err as Error).name === 'TokenExpiredError') {
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
