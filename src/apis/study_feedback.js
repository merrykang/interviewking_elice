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
exports.studyFeedbackApi = void 0;
var index_1 = require("../models/index");
var index_2 = require("../models/index");
var studyFeedbackApi = {
    /**피드백, 댓글 작성*/
    newFeedback: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user, _a, study_id, content_type, content, createInfo, createdFeedback, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        user_id = req.user.user_id;
                        console.log(user_id);
                        return [4 /*yield*/, index_2.User.findOne({ _id: user_id })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error('Not found user');
                        }
                        _a = req.body, study_id = _a.study_id, content_type = _a.content_type, content = _a.content;
                        createInfo = {
                            user_id: user_id,
                            user_name: user.user_name,
                            study_id: study_id,
                            content_type: content_type,
                            content: content,
                        };
                        return [4 /*yield*/, index_1.StudyFeedback.create(createInfo)];
                    case 2:
                        createdFeedback = _b.sent();
                        res.study_feedback = createdFeedback;
                        res.status(200).json(createdFeedback);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(407).json({
                            code: 407,
                            message: 'wrong request',
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /**피드백, 댓글 조회(스터디별)*/
    studyFeedback: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var study_id, foundFeedback, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        study_id = req.params.study_id;
                        return [4 /*yield*/, index_1.StudyFeedback.find({ study_id: study_id })];
                    case 1:
                        foundFeedback = _a.sent();
                        if (!foundFeedback)
                            throw new Error('Not found study feedback');
                        res.status(200).json(foundFeedback);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(408).json({
                            code: 408,
                            message: 'Not found study feedback',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**피드백, 댓글 조회(유저별)*/
    userFeedback: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, foundFeedback, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        console.log(user_id);
                        return [4 /*yield*/, index_1.StudyFeedback.find({ user_id: user_id })];
                    case 1:
                        foundFeedback = _a.sent();
                        console.log(foundFeedback);
                        if (!foundFeedback)
                            throw new Error('Not found user feedback');
                        res.status(200).json(foundFeedback);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(409).json({
                            code: 409,
                            message: 'Not found user feedback',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**피드백, 댓글 수정*/
    updateFeedback: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, study_id, content_type, content, user_id, foundFeedback, updateInfo, updatedFeedback, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, study_id = _a.study_id, content_type = _a.content_type, content = _a.content;
                        user_id = req.user.user_id;
                        return [4 /*yield*/, index_1.StudyFeedback.findOne({ user_id: user_id, study_id: study_id })];
                    case 1:
                        foundFeedback = _b.sent();
                        if (!foundFeedback)
                            throw new Error('Not authorizaion');
                        updateInfo = { content_type: content_type, content: content };
                        return [4 /*yield*/, index_1.StudyFeedback.updateOne({ user_id: user_id, study_id: study_id }, updateInfo)];
                    case 2:
                        updatedFeedback = _b.sent();
                        res.status(200).json(updatedFeedback);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        console.log(error_4);
                        res.status(410).json({
                            code: 410,
                            message: 'Not authorizaion',
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /**피드백, 댓글 삭제*/
    deleteFeedback: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var study_id, user_id, foundFeedback, deletedFeedback, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        study_id = req.params.study_id;
                        user_id = req.user.user_id;
                        return [4 /*yield*/, index_1.StudyFeedback.findOne({ user_id: user_id, study_id: study_id })];
                    case 1:
                        foundFeedback = _a.sent();
                        if (!foundFeedback)
                            throw new Error('Not authorizaion');
                        return [4 /*yield*/, index_1.StudyFeedback.deleteOne({ user_id: user_id, study_id: study_id })];
                    case 2:
                        deletedFeedback = _a.sent();
                        res.study_feedback = deletedFeedback;
                        res.status(200).json(deletedFeedback);
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(410).json({
                            code: 410,
                            message: 'Not authorizaion',
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
};
exports.studyFeedbackApi = studyFeedbackApi;
exports.default = studyFeedbackApi;
