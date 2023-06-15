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
exports.studyApi = void 0;
var index_1 = require("../models/index");
var index_2 = require("../models/index");
var index_3 = require("../models/index");
var index_4 = require("../models/index");
// const mongoose = require('mongoose');
// const { ObjectId } = require('mongodb');
var studyApi = {
    /**스터디 개설*/
    newStudy: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var leader_id, leader, _a, study_name, title, content, start, end, deadline, headcount, chat_link, status_1, createInfo, createdStudy, study_id, createRelation, createdRelation, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        leader_id = req.user.user_id;
                        console.log(leader_id);
                        return [4 /*yield*/, index_2.User.findOne({ _id: leader_id })];
                    case 1:
                        leader = _b.sent();
                        if (!leader) {
                            throw new Error('Not found leader');
                        }
                        console.log(leader.user_name);
                        _a = req.body, study_name = _a.study_name, title = _a.title, content = _a.content, start = _a.start, end = _a.end, deadline = _a.deadline, headcount = _a.headcount, chat_link = _a.chat_link, status_1 = _a.status;
                        createInfo = {
                            leader_id: leader_id,
                            leader_name: leader.user_name,
                            study_name: study_name,
                            title: title,
                            content: content,
                            start: start,
                            end: end,
                            deadline: deadline,
                            headcount: headcount,
                            acceptcount: 0,
                            chat_link: chat_link,
                            status: status_1,
                        };
                        return [4 /*yield*/, index_1.Study.create(createInfo)];
                    case 2:
                        createdStudy = _b.sent();
                        res.study = createdStudy;
                        res.status(200).json(createdStudy);
                        study_id = createdStudy._id;
                        console.log(study_id);
                        createRelation = {
                            user_id: leader_id,
                            study_id: study_id,
                            is_leader: 1,
                        };
                        return [4 /*yield*/, index_3.StudyRelation.create(createRelation)];
                    case 3:
                        createdRelation = _b.sent();
                        res.study_relation = createdRelation;
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(400).json({
                            code: 400,
                            message: 'wrong request',
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**스터디 신청*/
    applyStudy: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var member_id, _a, study_id, goal, createInfo, applyedStudy, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        member_id = req.user.user_id;
                        console.log(member_id);
                        _a = req.body, study_id = _a.study_id, goal = _a.goal;
                        createInfo = {
                            user_id: member_id,
                            study_id: study_id,
                            is_leader: 0,
                            goal: goal,
                            accept: 0,
                        };
                        return [4 /*yield*/, index_3.StudyRelation.create(createInfo)];
                    case 1:
                        applyedStudy = _b.sent();
                        res.study_relation = applyedStudy;
                        res.status(200).json(applyedStudy);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        res.status(401).json({
                            code: 401,
                            message: 'The leader cannot apply.',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**스터디 신청 수락*/
    acceptStudy: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, member_id, study_id, leader_id, leader, accept, updateInfo, updatedStudyRelation, foundStudy, updatedStudy, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = req.params, member_id = _a.member_id, study_id = _a.study_id;
                        leader_id = req.user.user_id;
                        return [4 /*yield*/, index_3.StudyRelation.findOne({ user_id: leader_id, study_id: study_id })];
                    case 1:
                        leader = _b.sent();
                        if (!leader || leader.is_leader === false)
                            throw new Error('Not leader');
                        console.log(leader);
                        accept = req.body.accept;
                        updateInfo = { accept: accept };
                        return [4 /*yield*/, index_3.StudyRelation.updateOne({ user_id: member_id, study_id: study_id }, updateInfo)];
                    case 2:
                        updatedStudyRelation = _b.sent();
                        console.log(updateInfo);
                        res.status(200).json(updatedStudyRelation);
                        return [4 /*yield*/, index_1.Study.findOne({ _id: study_id })];
                    case 3:
                        foundStudy = _b.sent();
                        if (!!foundStudy) return [3 /*break*/, 4];
                        throw new Error('Not found study');
                    case 4:
                        console.log(foundStudy);
                        if (accept === 1)
                            foundStudy.acceptcount += 1;
                        return [4 /*yield*/, foundStudy.save()];
                    case 5:
                        updatedStudy = _b.sent();
                        res.study = updatedStudy;
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_3 = _b.sent();
                        console.log(error_3);
                        res.status(402).json({
                            code: 402,
                            message: 'The member cannot have authorization to accept study application.',
                        });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    },
    /**스터디 정보 조회(전체)*/
    getStudy: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var foundStudy, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, index_1.Study.find({})];
                    case 1:
                        foundStudy = _a.sent();
                        if (!foundStudy)
                            throw new Error('Not found');
                        res.status(200).json(foundStudy);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        res.status(403).json({
                            code: 403,
                            message: 'Not found',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**스터디 정보 조회(모집 중)*/
    getStudyOne: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var study_id, foundStudy, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        study_id = req.params.study_id;
                        return [4 /*yield*/, index_1.Study.findOne({ _id: study_id })];
                    case 1:
                        foundStudy = _a.sent();
                        if (!foundStudy)
                            throw new Error('Not found study');
                        res.status(200).json(foundStudy);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(404).json({
                            code: 404,
                            message: 'Not found study',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**스터디 정보 수정*/
    updateStudy: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var study_id, leader_id, leader, _a, study_name, title, content, start, end, deadline, headcount, acceptcount, chat_link, status_2, updateInfo, updatedStudy, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        study_id = req.params.study_id;
                        leader_id = req.user.user_id;
                        return [4 /*yield*/, index_3.StudyRelation.findOne({ user_id: leader_id, study_id: study_id })];
                    case 1:
                        leader = _b.sent();
                        if (!leader || leader.is_leader === false)
                            throw new Error('Not leader');
                        console.log(leader);
                        _a = req.body, study_name = _a.study_name, title = _a.title, content = _a.content, start = _a.start, end = _a.end, deadline = _a.deadline, headcount = _a.headcount, acceptcount = _a.acceptcount, chat_link = _a.chat_link, status_2 = _a.status;
                        updateInfo = {
                            study_name: study_name,
                            title: title,
                            content: content,
                            start: start,
                            end: end,
                            deadline: deadline,
                            headcount: headcount,
                            acceptcount: acceptcount,
                            chat_link: chat_link,
                            status: status_2,
                        };
                        return [4 /*yield*/, index_1.Study.updateOne({ _id: study_id }, updateInfo)];
                    case 2:
                        updatedStudy = _b.sent();
                        res.status(200).json(updatedStudy);
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _b.sent();
                        console.log(error_6);
                        res.status(402).json({
                            code: 402,
                            message: 'The member cannot have authorization to update.',
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /**스터디 회원 관리*/
    deleteUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, study_id, member_id, leader_id, leader, deletedRelation, deletedFeedback, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.params, study_id = _a.study_id, member_id = _a.member_id;
                        leader_id = req.user.user_id;
                        return [4 /*yield*/, index_3.StudyRelation.findOne({ user_id: leader_id, study_id: study_id })];
                    case 1:
                        leader = _b.sent();
                        if (!leader || leader.is_leader === false)
                            throw new Error('Not leader');
                        console.log(leader);
                        return [4 /*yield*/, index_3.StudyRelation.deleteOne({ user_id: member_id })];
                    case 2:
                        deletedRelation = _b.sent();
                        res.study_relation = deletedRelation;
                        res.status(200).json(deletedRelation);
                        return [4 /*yield*/, index_4.StudyFeedback.deleteOne({ user_id: member_id })];
                    case 3:
                        deletedFeedback = _b.sent();
                        res.study_feedback = deletedFeedback;
                        return [3 /*break*/, 5];
                    case 4:
                        error_7 = _b.sent();
                        console.log(error_7);
                        res.status(402).json({
                            code: 402,
                            message: 'The member cannot have authorization to delete.',
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**스터디 탈퇴*/
    leaveUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var leader_id, study_id, user, deletedStudy, deletedRelation, deletedFeedback, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        leader_id = req.user.user_id;
                        study_id = req.body.study_id;
                        return [4 /*yield*/, index_3.StudyRelation.findOne({ user_id: leader_id, study_id: study_id })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('Not found user');
                        }
                        console.log(user);
                        if (!(user.is_leader === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, index_1.Study.deleteOne({ _id: study_id })];
                    case 2:
                        deletedStudy = _a.sent();
                        res.study = deletedStudy;
                        _a.label = 3;
                    case 3:
                        if (!(user.is_leader === true || user.is_leader === false)) return [3 /*break*/, 6];
                        return [4 /*yield*/, index_3.StudyRelation.deleteMany({ user_id: leader_id })];
                    case 4:
                        deletedRelation = _a.sent();
                        res.study_relation = deletedRelation;
                        res.status(200).json(deletedRelation);
                        return [4 /*yield*/, index_4.StudyFeedback.deleteMany({ user_id: leader_id })];
                    case 5:
                        deletedFeedback = _a.sent();
                        res.study_feedback = deletedFeedback;
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_8 = _a.sent();
                        console.log(error_8);
                        res.status(405).json({
                            code: 405,
                            message: 'wrong request',
                        });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    },
    /**스터디 삭제*/
    deleteStudy: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var study_id, leader_id, leader, foundStudy, deletedStudy, deletedRelation, deletedFeedback, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        study_id = req.params.study_id;
                        leader_id = req.user.user_id;
                        return [4 /*yield*/, index_3.StudyRelation.findOne({ user_id: leader_id, study_id: study_id })];
                    case 1:
                        leader = _a.sent();
                        if (!leader || leader.is_leader === false)
                            throw new Error('Not leader');
                        console.log(leader);
                        return [4 /*yield*/, index_1.Study.findOne({ _id: study_id })];
                    case 2:
                        foundStudy = _a.sent();
                        if (!foundStudy)
                            throw new Error('Not found');
                        return [4 /*yield*/, index_1.Study.deleteOne({ _id: study_id })];
                    case 3:
                        deletedStudy = _a.sent();
                        res.study = deletedStudy;
                        res.status(200).json(deletedStudy);
                        return [4 /*yield*/, index_3.StudyRelation.deleteMany({ study_id: study_id })];
                    case 4:
                        deletedRelation = _a.sent();
                        res.study_relation = deletedRelation;
                        return [4 /*yield*/, index_4.StudyFeedback.deleteMany({ study_id: study_id })];
                    case 5:
                        deletedFeedback = _a.sent();
                        res.study_feedback = deletedFeedback;
                        return [3 /*break*/, 7];
                    case 6:
                        error_9 = _a.sent();
                        console.log(error_9);
                        res.status(402).json({
                            code: 402,
                            message: 'The member cannot have authorization to delete study.',
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
};
exports.studyApi = studyApi;
exports.default = studyApi;
