import { User } from '../models/index';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = process.env.SECRET_KEY;

import validateEmail from '../utils/user';
import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
  user: any;
}

// dts_insert, dts_update 필드에 삽입할 변수 값 설정
const currentDate = new Date();
const dateString = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // 현재 날짜를 "yyyymmdd" 형식으로 설정
const timeString = currentDate.toTimeString().slice(0, 8).replace(/:/g, ''); // 현재 시간을 "hhmmss" 형식으로 설정

const userApi = {
  /** 로그인 유효성 검사 테스트 */
  async userApiIsLoginValidate(req: CustomRequest, res: Response) {
    console.log('로그인 유효성 검사 테스트!');
    const { token } = req.body;
    console.log(token + '/ userAPI');

    if (!token) {
      return res.status(401).json({
        resultCode: '401',
        message: '토큰이 없습니다. / 로그아웃상태',
      });
    }

    try {
      if (!secretKey) {
        throw new Error('Secret key is undefined');
      }
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      // 토큰이 유효한 경우
      // req.user = decoded;

      return res.status(200).json({
        resultCode: '200',
        message: '로그인 상태',
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
  },

  /** user API middleware 테스트 */
  async userMiddlewareApiTest(req: CustomRequest, res: Response, next: NextFunction) {
    console.log('미들웨어 실행! userApi 도착!');
    // 미들웨어 로직 처리
    console.log(req.cookies.token);
    next();
  },

  /** user_id 로 사용자 정보 조회 */
  async getUserIdInfo(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      // 클라이언트로부터 전달된 헤더(토큰값) 사용 - token header로 로그인 유무 판단
      const token = req.headers.authorization;
      console.log(token + '/ userAPI - getUserInfo - getUserIdInfo');

      if (!token) {
        throw new Error('token is undefined');
      }
      if (!secretKey) {
        throw new Error('Secret key is undefined');
      }
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      if (!decoded) {
        return res.status(401).json({
          resultCode: '401',
          message: '유효하지 않은 토큰입니다.',
          token: token,
        });
      }

      const { user_id } = req.params;

      const findUser = await User.findOne({ _id: user_id }); //나중에 user_id 값 사용가능하면? 사용가능할듯.

      if (!findUser) {
        return res.status(400).json({
          resultCode: '400',
          message: '해당 사용자를 찾을 수 없습니다.',
        });
      }

      return res.status(200).json({
        resultCode: '200',
        message: '사용자 정보 조회 성공',
        data: {
          user_id: findUser._id,
          user_name: findUser.user_name,
          email: findUser.email,
          intro_yn: findUser.intro_yn,
          phone_number: findUser.phone_number,
          file_key: findUser.file_key,
          file_name: findUser.file_name,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        resultCode: '500',
        message: '서버오류',
      });
    }
  },

  /** 회원가입 */
  async registerUser(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { user_name, email, password, passwordCheck, phone_number } = req.body;

      // 입력값 검사
      if (
        user_name === '' ||
        email === '' ||
        password === '' ||
        passwordCheck === '' ||
        phone_number === ''
      ) {
        return res.status(400).json({
          resultCode: 400,
          message: '정보를 모두 입력하세요.',
        });
      }

      // 이메일 형식 유효성 검사
      if (!validateEmail(email)) {
        return res.status(400).json({
          resultCode: '400',
          message: '올바른 이메일 형식이 아닙니다.',
        });
      }

      // 비밀번호, 비밀번호 확인 값 검사
      if (password !== passwordCheck) {
        return res.status(400).json({
          resultCode: 400,
          message: '비밀번호가 일치하지 않습니다.',
        });
      }

      // 기존 사용자(이메일) 유무 검사
      const findUser = await User.findOne({ email: email });

      if (findUser) {
        return res.status(400).json({
          resultCode: '400',
          message: '기존에 가입되어 있는 회원입니다.',
          data: {
            user_id: findUser._id,
            email: findUser.email,
          },
        });
      }

      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 계정 생성 정보
      const newUserInfo = {
        user_name,
        email,
        password: hashedPassword,
        phone_number,
        dts_insert: dateString + timeString,
        dts_update: null,
      };

      const newUser = await User.create(newUserInfo);

      res.status(200).json({
        resultCode: '200',
        message: '회원가입 성공',
        data: {
          user_id: newUser._id,
          email: newUser.email,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        resultCode: '500',
        message: '서버오류',
      });
    }
  },

  /** 로그인 */
  async loginUser(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // 입력값 검사
      if (email === '' || password === '') {
        return res.status(400).json({
          resultCode: 400,
          message: '정보를 모두 입력하세요.',
        });
      }

      // 이메일 형식 유효성 검사
      if (!validateEmail(email)) {
        return res.status(400).json({
          resultCode: '400',
          message: '올바른 이메일 형식이 아닙니다.',
        });
      }

      // 기존 사용자 유무 검사
      const findUser = await User.findOne({ email: email });

      if (!findUser) {
        return res.status(200).json({
          resultCode: '400',
          message: '사용자가 존재하지 않습니다.',
        });
      }

      // 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (!isPasswordValid) {
        return res.status(400).json({
          resultCode: '400',
          message: '비밀번호가 맞지 않습니다.',
        });
      }

      // JWT 토큰 생성
      const payload = {
        user_id: findUser._id, // 사용자의 MongoDB ObjectID
      };

      if (!secretKey) {
        throw new Error('Secret key is undefined');
      }
      const token = jwt.sign(payload, secretKey, { expiresIn: '3d' }); // 토큰 만료시간

      // JWT 토큰 쿠키에 담아주기 - 주석 처리
      // res.cookie('token', token, {
      //     httpOnly: true,
      //     maxAge: 3 * 24 * 60 * 60 * 1000,    // 3일 (단위: 밀리초) // 3600000(=1시간) (단위: 밀리초)
      //     sameSite: 'none'
      //     // secure: true,
      // });

      // 설정된 쿠키 값 출력
      // console.log('로그인' + req.cookies.token);

      res.status(200).json({
        resultCode: '200',
        message: '로그인 성공',
        data: {
          user_id: findUser._id,
          user_name: findUser.user_name,
          email,
          token,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        resultCode: '500',
        message: '서버오류',
      });
    }
  },

  /** 내 정보 조회 */
  async getUserInfo(req: CustomRequest, res: Response) {
    // 쿠키값 사용 주석 처리
    // const token = req.cookies.token;
    // console.log('미들웨어 실행 -> userApi getUserInfo 도착!');
    // console.log('내정보조회' + req.cookies.token);

    // json body (localStorage 값 사용)
    // const { token } = req.body;

    // 클라이언트로부터 전달된 헤더(토큰값) 사용
    const token = req.headers.authorization;
    console.log(token + '/ userAPI - getUserInfo - header');

    try {
      if (!token) {
        throw new Error('Token is undefined');
      }
      if (!secretKey) {
        throw new Error('Secret key is undefined');
      }
      const decoded = jwt.verify(token, secretKey);

      if (!decoded) {
        return res.status(401).json({
          resultCode: '401',
          message: '유효하지 않은 토큰입니다.',
          token: token,
        });
      }

      // req.user = decoded;
      // const { user_id } = req.user;    // 왜 안되지?
      if (typeof decoded === 'object' && decoded.user_id) {
        const { user_id } = decoded;
        const findUser = await User.findOne(
          { _id: user_id },
          {
            _id: true,
            user_name: true,
            email: true,
            intro_yn: true,
            phone_number: true,
            file_key: true,
            file_name: true,
          },
        );

        if (!findUser) {
          // 여기로 안들어오네?
          return res.status(400).json({
            resultCode: '400',
            message: '조회 실패',
          });
        }

        res.status(200).json({
          resultCode: '200',
          message: '인증된 토큰입니다.',
          data: {
            user_id: findUser._id,
            user_name: findUser.user_name,
            email: findUser.email,
            intro_yn: findUser.intro_yn,
            phone_number: findUser.phone_number,
            file_key: findUser.file_key,
            file_name: findUser.file_name,
            // token: token
          },
        });
      } else {
        throw new Error('user id is not object');
      }
    } catch (err) {
      console.error(err);
    }
  },

  /** 내 정보 수정 */
  async modifyUserInfo(req: CustomRequest, res: Response, next: NextFunction) {
    // 쿠키값 사용 주석 처리
    // const token = req.cookies.token;
    // console.log('미들웨어 실행 -> userApi modifyUserInfo 도착!');
    // console.log('내정보수정' + req.cookies.token);

    // json body (localStorage 값 사용)
    // const { token } = req.body.token;

    try {
      const { token } = req.body;

      // middleware 이용 테스트
      const { user_id } = req.user;
      // console.log(user_id);
      // console.log('middleware 에서 불러온 decoded값' + user_id);

      // middleware 이용 테스트
      // const { decodedUserId } = req.user;
      // console.log(decodedUserId);
      // console.log('middleware 에서 불러온 decoded값' + decodedUserId);

      // const { user_id, email, password, intro_yn, phone_number } = req.body;
      const { email, password, intro_yn, phone_number, file_key, file_name } = req.body;

      const findUser = await User.findOne({ _id: user_id }); //나중에 user_id 값 사용가능하면? 사용가능할듯.
      // const findUser = await User.findOne({ "email": email });

      if (!findUser) {
        return res.status(400).json({
          resultCode: '400',
          message: '해당 사용자를 찾을 수 없습니다.',
        });
      }

      // 기존 사용자 정보
      const findUserId = findUser._id;
      const findUserEmail = findUser.email;
      const findUserPassword = findUser.password;
      const findUserIntro_yn = findUser.intro_yn;
      const findUserPhoneNumber = findUser.phone_number;
      const findUserFileKey = findUser.file_key;
      const findUserFileName = findUser.file_name;

      // 변경사항 있는지 확인
      let isModified = false;

      if (email !== findUserEmail) {
        findUser.email = email;
        isModified = true;
      }
      if (password !== findUserPassword) {
        findUser.password = password;
        isModified = true;
      }
      if (intro_yn !== findUserIntro_yn) {
        findUser.intro_yn = intro_yn;
        isModified = true;
      }
      if (phone_number !== findUserPhoneNumber) {
        findUser.phone_number = phone_number;
        isModified = true;
      }
      if (file_key !== findUserFileKey) {
        findUser.file_key = file_key;
        isModified = true;
      }
      if (file_name !== findUserFileName) {
        findUser.file_name = file_name;
        isModified = true;
      }

      // 변경사항이 없는 경우의 처리 로직
      if (!isModified) {
        return res.status(200).json({
          resultCode: '200',
          message: '변경사항이 없습니다.',
        });
      }

      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 변경사항이 있을 경우 처리 로직
      const changeUserInfo = await User.updateOne(
        { email: email },
        {
          $set: {
            password: hashedPassword,
            intro_yn: intro_yn,
            phone_number: phone_number,
            dts_update: dateString + timeString,
            file_key: file_key,
            file_name: file_name,
          },
        },
      );

      const updatedUser = await User.findOne(
        { _id: findUser._id },
        {
          _id: true,
          user_name: true,
          email: true,
          intro_yn: true,
          phone_number: true,
          file_key: true,
          file_name: true,
        },
      );
      if (updatedUser === null) throw new Error('updated user info is null');
      return res.status(200).json({
        resultCode: '200',
        message: '내 정보 수정 성공',
        data: {
          user_id: updatedUser._id,
          user_name: updatedUser.user_name,
          email: updatedUser.email,
          intro_yn: updatedUser.intro_yn,
          phone_number: updatedUser.phone_number,
          file_key: updatedUser.file_key,
          file_name: updatedUser.file_name,
          // token: token
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        resultCode: '500',
        message: '서버오류',
      });
    }
  },

  /** 회원탈퇴 */
  async deleteUser(req: CustomRequest, res: Response, next: NextFunction) {
    // 쿠키값 사용 주석 처리
    // const token = req.cookies.token;
    // console.log('미들웨어 실행 -> userApi deleteUser 도착!');
    // console.log('회원탈퇴' + req.cookies.token);

    // json body (localStorage 값 사용)
    // const { token } = req.body.token;
    const { token } = req.body;

    try {
      // middleware 이용 테스트
      const { user_id } = req.user;
      // console.log(user_id);
      // console.log('middleware 에서 불러온 decoded값' + user_id);

      // const { user_id, email, password } = req.body;
      const { email, password } = req.body;

      const findUser = await User.findOne({ _id: user_id });

      if (!findUser) {
        return res.status(400).json({
          resultCode: '400',
          message: '해당 사용자를 찾을 수 없습니다.',
        });
      }

      // 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(password, findUser.password); // 평문값과 암호화값 비교

      if (!isPasswordValid) {
        return res.status(200).json({
          resultCode: '200',
          message: '비밀번호가 맞지 않아 탈퇴할 수 없습니다.',
        });
      }

      // 회원 탈퇴
      await User.deleteOne({ _id: user_id });

      // 회원탈퇴시 토큰도 지워주자
      // 헤더에 저장된 토큰 삭제
      res.setHeader('Authorization', '');

      // 토큰 쿠키 삭제
      res.clearCookie('token');

      res.status(200).json({
        resultCode: '200',
        message: '회원탈퇴 성공',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        resultCode: '500',
        message: '서버오류',
      });
    }
  },

  /** 로그아웃 */
  async logoutUser(req: CustomRequest, res: Response, next: NextFunction) {
    // 쿠키값 사용 주석 처리
    // const token = req.cookies.token;
    // console.log('미들웨어 실행 -> userApi logoutUser 도착!');
    // console.log('로그아웃' + req.cookies.token);

    // json body (localStorage 값 사용)
    // const { token } = req.body;
    let { token } = req.body;
    console.log(token + '/ userAPI - logoutUser');

    try {
      // middleware 이용 테스트
      const { user_id } = req.user;
      // console.log(user_id);
      // console.log('middleware 에서 불러온 decoded값' + user_id);

      // 쿠키 삭제 - 주석처리
      // res.clearCookie('token');

      // 클라이언트에서 localStorage 값 제거 필요

      if (user_id) {
        return res.status(200).json({
          resultCode: '200',
          message: '로그아웃 성공',
          // token
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        resultCode: '500',
        message: '서버오류',
      });
    }
  },
};

export { CustomRequest, userApi };
export default userApi;
