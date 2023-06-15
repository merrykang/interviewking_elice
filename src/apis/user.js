"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userApi = void 0;
var index_1 = require("../models/index");
var app = require('express');
// const ObjectId = mongoose.Types.ObjectId;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var secretKey = process.env.SECRET_KEY;
var user_1 = require("../utils/user");
// dts_insert, dts_update 필드에 삽입할 변수 값 설정
var currentDate = new Date();
var dateString = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // 현재 날짜를 "yyyymmdd" 형식으로 설정
var timeString = currentDate.toTimeString().slice(0, 8).replace(/:/g, ''); // 현재 시간을 "hhmmss" 형식으로 설정
var userApi = {
    /** user API middleware 테스트 */
    userMiddlewareApiTest: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('미들웨어 실행! userApi 도착!');
                // 미들웨어 로직 처리
                console.log(req.cookies.token);
                next();
                return [2 /*return*/];
            });
        });
    },
    /** user 정보 전체 DB 조회 테스트 */
    getAllUserInfo: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var findAllUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, index_1.User.find({})];
                    case 1:
                        findAllUser = _a.sent();
                        if (!findAllUser) {
                            return [2 /*return*/, res.status(400).json({
                                    resultCode: '400',
                                    message: '조회 실패',
                                })];
                        }
                        res.status(200).json({
                            resultCode: '200',
                            message: '조회 성공',
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error(err_1);
                        res.status(500).json({
                            resultCode: '500',
                            message: '서버오류',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /** 회원가입 */
    registerUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user_name, email, password, passwordCheck, findUser, hashedPassword, newUserInfo, newUser, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, user_name = _a.user_name, email = _a.email, password = _a.password, passwordCheck = _a.passwordCheck;
                        // 입력값 검사
                        if (user_name === '' || email === '' || password === '' || passwordCheck === '') {
                            return [2 /*return*/, res.status(400).json({
                                    resultCode: 400,
                                    message: '정보를 모두 입력하세요.',
                                })];
                        }
                        // 이메일 형식 유효성 검사
                        if (!(0, user_1.default)(email)) {
                            return [2 /*return*/, res.status(400).json({
                                    resultCode: '400',
                                    message: '올바른 이메일 형식이 아닙니다.',
                                })];
                        }
                        // 비밀번호, 비밀번호 확인 값 검사
                        if (password !== passwordCheck) {
                            return [2 /*return*/, res.status(400).json({
                                    resultCode: 400,
                                    message: '비밀번호가 일치하지 않습니다.',
                                })];
                        }
                        return [4 /*yield*/, index_1.User.findOne({ email: email })];
                    case 1:
                        findUser = _b.sent();
                        if (findUser) {
                            return [2 /*return*/, res.status(400).json({
                                    resultCode: '400',
                                    message: '기존에 가입되어 있는 회원입니다.',
                                    data: {
                                        user_id: findUser._id,
                                        email: findUser.email,
                                    },
                                })];
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 2:
                        hashedPassword = _b.sent();
                        newUserInfo = {
                            user_name: user_name,
                            email: email,
                            password: hashedPassword,
                            dts_insert: dateString + timeString,
                            dts_update: null,
                        };
                        return [4 /*yield*/, index_1.User.create(newUserInfo)];
                    case 3:
                        newUser = _b.sent();
                        res.status(200).json({
                            resultCode: '200',
                            message: '회원가입 성공',
                            data: {
                                user_id: newUser._id,
                                email: newUser.email,
                            },
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _b.sent();
                        console.error(err_2);
                        res.status(500).json({
                            resultCode: '500',
                            message: '서버오류',
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /** 로그인 */
    loginUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, findUser, isPasswordValid, payload, token, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, index_1.User.findOne({ email: email })];
                    case 1:
                        findUser = _b.sent();
                        if (!findUser) {
                            return [2 /*return*/, res.status(200).json({
                                    resultCode: '400',
                                    message: '사용자가 존재하지 않습니다.',
                                })];
                        }
                        return [4 /*yield*/, bcrypt.compare(password, findUser.password)];
                    case 2:
                        isPasswordValid = _b.sent();
                        if (!isPasswordValid) {
                            return [2 /*return*/, res.status(400).json({
                                    resultCode: '400',
                                    message: '비밀번호가 맞지 않습니다.',
                                })];
                        }
                        payload = {
                            user_id: findUser._id, // 사용자의 MongoDB ObjectID
                        };
                        token = jwt.sign(payload, secretKey, { expiresIn: '3d' });
                        // JWT 토큰 쿠키에 담아주기
                        res.cookie('token', token, {
                            httpOnly: true,
                            maxAge: 3 * 24 * 60 * 60 * 1000,
                            sameSite: 'none',
                            // secure: true,
                        });
                        // 설정된 쿠키 값 출력
                        // console.log('로그인' + req.cookies.token);
                        res.status(200).json({
                            resultCode: '200',
                            message: '로그인 성공',
                            data: {
                                user_id: findUser._id,
                                email: email,
                                // token
                            },
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _b.sent();
                        console.error(err_3);
                        return [2 /*return*/, res.status(500).json({
                                resultCode: '500',
                                message: '서버오류',
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /** 내 정보 조회 */
    getUserInfo: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user_id, findUser, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.cookies.token;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        user_id = req.user.user_id;
                        return [4 /*yield*/, index_1.User.findOne({ _id: user_id }, {
                                _id: true,
                                user_name: true,
                                email: true,
                                intro_yn: true,
                                phone_number: true,
                            })];
                    case 2:
                        findUser = _a.sent();
                        if (!findUser) {
                            // 여기로 안들어오네?
                            return [2 /*return*/, res.status(400).json({
                                    resultCode: '400',
                                    message: '조회 실패',
                                })];
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
                                // token: token
                            },
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        console.error(err_4);
                        res.status(500).json({
                            resultCode: '500',
                            message: '서버오류',
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /** 내 정보 수정 */
    modifyUserInfo: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user_id, _a, email, password, intro_yn, phone_number, findUser, findUserId, findUserEmail, findUserPassword, findUserIntro_yn, findUserPhoneNumber, isModified, hashedPassword, changeUserInfo, updatedUser, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        token = req.cookies.token;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        user_id = req.user.user_id;
                        _a = req.body, email = _a.email, password = _a.password, intro_yn = _a.intro_yn, phone_number = _a.phone_number;
                        return [4 /*yield*/, index_1.User.findOne({ _id: user_id })];
                    case 2:
                        findUser = _b.sent();
                        // const findUser = await User.findOne({ "email": email });
                        if (!findUser) {
                            return [2 /*return*/, res.status(400).json({
                                    resultCode: '400',
                                    message: '해당 사용자를 찾을 수 없습니다.',
                                })];
                        }
                        findUserId = findUser._id;
                        findUserEmail = findUser.email;
                        findUserPassword = findUser.password;
                        findUserIntro_yn = findUser.intro_yn;
                        findUserPhoneNumber = findUser.phone_number;
                        isModified = false;
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
                        // 변경사항이 없는 경우의 처리 로직
                        if (!isModified) {
                            return [2 /*return*/, res.status(200).json({
                                    resultCode: '200',
                                    message: '변경사항이 없습니다.',
                                })];
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 3:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, index_1.User.updateOne({ email: email }, {
                                $set: {
                                    password: hashedPassword,
                                    intro_yn: intro_yn,
                                    phone_number: phone_number,
                                    dts_update: dateString + timeString,
                                },
                            })];
                    case 4:
                        changeUserInfo = _b.sent();
                        return [4 /*yield*/, index_1.User.findOne({ _id: findUser._id }, {
                                _id: true,
                                user_name: true,
                                email: true,
                                intro_yn: true,
                                phone_number: true,
                            })];
                    case 5:
                        updatedUser = _b.sent();
                        if (!updatedUser) {
                            throw new Error('Not update');
                        }
                        return [2 /*return*/, res.status(200).json({
                                resultCode: '200',
                                message: '내 정보 수정 성공',
                                data: {
                                    user_id: updatedUser._id,
                                    email: updatedUser.email,
                                    intro_yn: updatedUser.intro_yn,
                                    phone_number: updatedUser.phone_number,
                                },
                            })];
                    case 6:
                        err_5 = _b.sent();
                        console.error(err_5);
                        res.status(500).json({
                            resultCode: '500',
                            message: '서버오류',
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    /** 회원탈퇴 */
    deleteUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user_id, _a, email, password, findUser, isPasswordValid, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        token = req.cookies.token;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        user_id = req.user.user_id;
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, index_1.User.findOne({ _id: user_id })];
                    case 2:
                        findUser = _b.sent();
                        if (!findUser) {
                            return [2 /*return*/, res.status(400).json({
                                    resultCode: '400',
                                    message: '해당 사용자를 찾을 수 없습니다.',
                                })];
                        }
                        return [4 /*yield*/, bcrypt.compare(password, findUser.password)];
                    case 3:
                        isPasswordValid = _b.sent();
                        if (!isPasswordValid) {
                            return [2 /*return*/, res.status(200).json({
                                    resultCode: '200',
                                    message: '비밀번호가 맞지 않아 탈퇴할 수 없습니다.',
                                })];
                        }
                        // 회원 탈퇴
                        return [4 /*yield*/, index_1.User.deleteOne({ _id: user_id })];
                    case 4:
                        // 회원 탈퇴
                        _b.sent();
                        // 회원탈퇴시 토큰도 지워주자
                        // 헤더에 저장된 토큰 삭제
                        res.setHeader('Authorization', '');
                        // 토큰 쿠키 삭제
                        res.clearCookie('token');
                        res.status(200).json({
                            resultCode: '200',
                            message: '회원탈퇴 성공',
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        err_6 = _b.sent();
                        console.error(err_6);
                        res.status(500).json({
                            resultCode: '500',
                            message: '서버오류',
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    /** 로그아웃 */
    logoutUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user_id;
            return __generator(this, function (_a) {
                token = req.cookies.token;
                console.log('미들웨어 실행 -> userApi logoutUser 도착!');
                console.log('로그아웃' + req.cookies.token);
                try {
                    user_id = req.user.user_id;
                    console.log(user_id);
                    console.log('middleware 에서 불러온 decoded값' + user_id);
                    // 쿠키 삭제
                    res.clearCookie('token');
                    return [2 /*return*/, res.status(200).json({
                            resultCode: '200',
                            message: '로그아웃 성공',
                        })];
                }
                catch (err) {
                    console.error(err);
                    res.status(500).json({
                        resultCode: '500',
                        message: '서버오류',
                    });
                }
                return [2 /*return*/];
            });
        });
    },
};
exports.userApi = userApi;
exports.default = userApi;
