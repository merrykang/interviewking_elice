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
exports.communityApi = void 0;
var models_1 = require("../models");
exports.communityApi = {
    /** 전체목록조회 */
    getAllList: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findContent, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.Community.find({})];
                    case 1:
                        findContent = _a.sent();
                        if (!findContent) {
                            return [2 /*return*/, res.status(400).json({ message: '목록조회 실패' })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                message: '목록조회 성공',
                                data: findContent,
                            })];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        if (typeof err_1 === 'string' || err_1 === undefined) {
                            throw new Error(err_1);
                        }
                        else {
                            throw new Error('Unknown error occurred');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /** 게시글등록 */
    postContent: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            /** 게시글번호 순차부여 */
            function getLastCommunityId() {
                return __awaiter(this, void 0, void 0, function () {
                    var lastCommunity;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, models_1.Community.findOne().sort({ community_id: -1 }).limit(1).exec()];
                            case 1:
                                lastCommunity = _a.sent();
                                if (lastCommunity) {
                                    return [2 /*return*/, lastCommunity.community_id];
                                }
                                return [2 /*return*/, 1];
                        }
                    });
                });
            }
            var _a, user_id, title, content, findUser, file_etag, file_name, file_key, lastCommunityId, newCommunityId, user_name, newContent, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, user_id = _a.user_id, title = _a.title, content = _a.content;
                        return [4 /*yield*/, models_1.User.findOne({ _id: user_id }).populate('_id').exec()];
                    case 1:
                        findUser = _b.sent();
                        if (!findUser) {
                            throw new Error('Not found user');
                        }
                        file_etag = req.body.file_etag;
                        file_name = req.body.file_name;
                        file_key = req.body.file_key;
                        return [4 /*yield*/, getLastCommunityId()];
                    case 2:
                        lastCommunityId = _b.sent();
                        if (lastCommunityId === undefined) {
                            throw new Error('Undefined id');
                        }
                        newCommunityId = lastCommunityId + 1;
                        user_name = findUser.user_name;
                        return [4 /*yield*/, models_1.Community.create({
                                community_id: newCommunityId,
                                user_id: user_id,
                                user_name: user_name,
                                title: title,
                                content: content,
                                file_key: file_key,
                                file_etag: file_etag,
                                file_name: file_name,
                            })];
                    case 3:
                        newContent = _b.sent();
                        if (!newContent) {
                            return [2 /*return*/, res.status(400).json({ message: '게시글생성 실패' })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                message: '게시글등록 성공',
                                data: newContent,
                            })];
                    case 4:
                        err_2 = _b.sent();
                        if (typeof err_2 === 'string' || err_2 === undefined) {
                            throw new Error(err_2);
                        }
                        else {
                            throw new Error('Unknown error occurred');
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /** 게시글조회(개별) : 게시글+댓글+첨부파일 */
    getContent: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, community_id, user_id, findContent, findReply, updateContent, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.query, community_id = _a.community_id, user_id = _a.user_id;
                        return [4 /*yield*/, models_1.Community.find({ community_id: community_id })];
                    case 1:
                        findContent = _b.sent();
                        return [4 /*yield*/, models_1.CommunityReply.find({ community_id: community_id })];
                    case 2:
                        findReply = _b.sent();
                        if (!findContent) {
                            return [2 /*return*/, res.status(400).json({ message: '게시글조회 실패' })];
                        }
                        return [4 /*yield*/, models_1.Community.findOneAndUpdate({ community_id: community_id }, { $addToSet: { read_users: user_id } }, { new: true })];
                    case 3:
                        updateContent = _b.sent();
                        return [2 /*return*/, res.status(200).json({
                                message: '게시글조회 성공',
                                data: { updateContent: updateContent, findReply: findReply },
                            })];
                    case 4:
                        err_3 = _b.sent();
                        console.log(err_3);
                        if (typeof err_3 === 'string' || err_3 === undefined) {
                            throw new Error(err_3);
                        }
                        else {
                            throw new Error('Unknown error occurred');
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /** 첨부파일 다운로드 : 프론트 구현 확인 후 삭제예정 */
    // async fileDownload(req, res) {
    //     try {
    //         const fileStream = req.fileStream;
    //         const findContent = await Community.find({ community_id: req.query.community_id });
    //         if (!findContent) {
    //             return res.status(400).json({ message: "파일 다운로드 실패" });
    //         }
    //         /** 클라이언트에게 다운로드 파일 전달 */
    //         if (fileStream) {
    //             res.set('Content-Type', fileStream.contentType);
    //             res.set('Content-Disposition', fileStream.contentDisposition);
    //             fileStream.fileStream.pipe(res);
    //             return res.status(200).json({
    //                 message: "파일 다운로드 성공"
    //             });
    //         }
    //     } catch (err) {
    //     console.log(err);
    //     throw new Error(err);
    //     }
    // },
    /** 게시글수정 */
    modifyContent: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, community_id, title, content, file_etag, file_name, file_key, findContent, updateContent, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, community_id = _a.community_id, title = _a.title, content = _a.content, file_etag = _a.file_etag, file_name = _a.file_name, file_key = _a.file_key;
                        return [4 /*yield*/, models_1.Community.findOne({ community_id: community_id })];
                    case 1:
                        findContent = _b.sent();
                        // token 확인 후 업데이트예정
                        // const user_id = req.user.user_id;
                        // const { user_id } = req.user;
                        // console.log('userTokenValidate: ', userTokenValidate);
                        // if(!user_id){
                        //     return res.status(400).json({ message: "유효하지 않은 사용자" });
                        // }
                        if (!findContent) {
                            return [2 /*return*/, res.status(400).json({ message: '게시글찾기 실패' })];
                        }
                        return [4 /*yield*/, models_1.Community.findOneAndUpdate({ community_id: community_id }, {
                                title: title,
                                content: content,
                                file_key: file_key,
                                file_etag: file_etag,
                                file_name: file_name,
                            }, { new: true })];
                    case 2:
                        updateContent = _b.sent();
                        if (!updateContent) {
                            return [2 /*return*/, res.status(400).json({ message: '게시글수정 실패' })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                message: '게시글수정 성공',
                                data: updateContent,
                            })];
                    case 3:
                        err_4 = _b.sent();
                        console.log(err_4);
                        if (typeof err_4 === 'string' || err_4 === undefined) {
                            throw new Error(err_4);
                        }
                        else {
                            throw new Error('Unknown error occurred');
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /** 게시글삭제 */
    deleteContent: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findContent, deleteContent, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, models_1.Community.findOne({ community_id: req.query.community_id })];
                    case 1:
                        findContent = _a.sent();
                        // token 확인 후 업데이트예정
                        // const user_id = req.user.user_id;
                        // const { user_id } = req.user;
                        // console.log('userTokenValidate: ', userTokenValidate);
                        // if(!user_id){
                        //     return res.status(400).json({ message: "유효하지 않은 사용자" });
                        // }
                        if (!findContent) {
                            return [2 /*return*/, res.status(400).json({ message: '게시글삭제 실패' })];
                        }
                        return [4 /*yield*/, models_1.Community.deleteOne({ community_id: req.query.community_id })];
                    case 2:
                        deleteContent = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                message: '게시글삭제 성공',
                            })];
                    case 3:
                        err_5 = _a.sent();
                        console.log(err_5);
                        if (typeof err_5 === 'string' || err_5 === undefined) {
                            throw new Error(err_5);
                        }
                        else {
                            throw new Error('Unknown error occurred');
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /** 댓글등록 */
    postReply: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            /** 댓글번호 순차부여 */
            function getLastCommunityId() {
                return __awaiter(this, void 0, void 0, function () {
                    var lastCommunity;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, models_1.CommunityReply.findOne().sort({ reply_id: -1 }).limit(1).exec()];
                            case 1:
                                lastCommunity = _a.sent();
                                if (lastCommunity)
                                    return [2 /*return*/, lastCommunity.reply_id];
                                return [2 /*return*/, 1];
                        }
                    });
                });
            }
            var _a, reply_user_id, reply_content, community_id, lastCommunityId, newCommunityId, findUser, reply_user_name, newContent, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, reply_user_id = _a.reply_user_id, reply_content = _a.reply_content, community_id = _a.community_id;
                        return [4 /*yield*/, getLastCommunityId()];
                    case 1:
                        lastCommunityId = _b.sent();
                        if (lastCommunityId === undefined) {
                            throw new Error('Undefined id');
                        }
                        newCommunityId = lastCommunityId + 1;
                        return [4 /*yield*/, models_1.User.findOne({ _id: reply_user_id }).populate('_id').exec()];
                    case 2:
                        findUser = _b.sent();
                        if (!findUser) {
                            throw new Error('Not found user');
                        }
                        reply_user_name = findUser.user_name;
                        return [4 /*yield*/, models_1.CommunityReply.create({
                                reply_id: newCommunityId,
                                reply_user_id: reply_user_id,
                                reply_user_name: reply_user_name,
                                reply_content: reply_content,
                                community_id: community_id,
                            })];
                    case 3:
                        newContent = _b.sent();
                        if (!newContent) {
                            return [2 /*return*/, res.status(400).json({ message: '댓글등록 실패' })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                message: '댓글등록 성공',
                                data: newContent,
                            })];
                    case 4:
                        err_6 = _b.sent();
                        console.log(err_6);
                        if (typeof err_6 === 'string' || err_6 === undefined) {
                            throw new Error(err_6);
                        }
                        else {
                            throw new Error('Unknown error occurred');
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /** 댓글수정 */
    modifyReply: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, reply_id, reply_content, findReply, updateContent, err_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, reply_id = _a.reply_id, reply_content = _a.reply_content;
                        return [4 /*yield*/, models_1.CommunityReply.findOne({ reply_id: reply_id })];
                    case 1:
                        findReply = _b.sent();
                        // token 확인 후 업데이트예정
                        // const user_id = req.user.user_id;
                        // const { user_id } = req.user;
                        // console.log('userTokenValidate: ', userTokenValidate);
                        // if(!user_id){
                        //     return res.status(400).json({ message: "유효하지 않은 사용자" });
                        // }
                        if (!findReply) {
                            return [2 /*return*/, res.status(400).json({ message: '댓글수정 실패' })];
                        }
                        return [4 /*yield*/, models_1.CommunityReply.findOneAndUpdate({ reply_id: findReply.reply_id }, {
                                reply_content: reply_content,
                            }, { new: true })];
                    case 2:
                        updateContent = _b.sent();
                        return [2 /*return*/, res.status(200).json({
                                message: '댓글수정 성공',
                                data: updateContent,
                            })];
                    case 3:
                        err_7 = _b.sent();
                        console.log(err_7);
                        if (typeof err_7 === 'string' || err_7 === undefined) {
                            throw new Error(err_7);
                        }
                        else {
                            throw new Error('Unknown error occurred');
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /** 댓글삭제 */
    deleteReply: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findReply, deleteContent, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, models_1.CommunityReply.findOne({ reply_id: req.query.reply_id })];
                    case 1:
                        findReply = _a.sent();
                        // token 확인 후 업데이트예정
                        // const user_id = req.user.user_id;
                        // const { user_id } = req.user;
                        // console.log('userTokenValidate: ', userTokenValidate);
                        // if(!user_id){
                        //     return res.status(400).json({ message: "유효하지 않은 사용자" });
                        // }
                        if (!findReply) {
                            return [2 /*return*/, res.status(400).json({ message: '댓글삭제 실패' })];
                        }
                        return [4 /*yield*/, models_1.CommunityReply.deleteOne({ reply_id: req.query.reply_id })];
                    case 2:
                        deleteContent = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                message: '댓글삭제 성공',
                            })];
                    case 3:
                        err_8 = _a.sent();
                        console.log(err_8);
                        if (typeof err_8 === 'string' || err_8 === undefined) {
                            throw new Error(err_8);
                        }
                        else {
                            throw new Error('Unknown error occurred');
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
};
exports.default = exports.communityApi;
