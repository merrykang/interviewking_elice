"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var study_1 = require("../apis/study");
var userTokenValidate_1 = require("../middlewares/userTokenValidate");
// CustomRequest, CustomResponse 매개 변수와 형식 맞추어주는 미들웨어
var adaptRequest = function (handler) {
    return function (req, res, next) {
        var customReq = req;
        handler(customReq, res, next);
    };
};
var router = (0, express_1.Router)();
// router.use(userTokenValidate);
router.post('/create', userTokenValidate_1.default, adaptRequest(study_1.studyApi.newStudy)); // 스터디 개설
router.post('/apply', userTokenValidate_1.default, adaptRequest(study_1.studyApi.applyStudy)); // 스터디 신청
router.put('/accept/:study_id/:member_id', userTokenValidate_1.default, adaptRequest(study_1.studyApi.acceptStudy)); // 스터디 신청 수락
router.get('/info', adaptRequest(study_1.studyApi.getStudy)); // 스터디 정보 조회(전체)
router.get('/info/:study_id', adaptRequest(study_1.studyApi.getStudyOne)); // 스터디 정보 조회(스터디별)
router.put('/info/:study_id', userTokenValidate_1.default, adaptRequest(study_1.studyApi.updateStudy)); // 스터디 정보 수정(장)
router.delete('/', userTokenValidate_1.default, adaptRequest(study_1.studyApi.leaveUser)); // 스터디 탈퇴
router.delete('/:study_id/:member_id', userTokenValidate_1.default, adaptRequest(study_1.studyApi.deleteUser)); // 스터디 회원 관리(장)
router.delete('/:study_id', userTokenValidate_1.default, adaptRequest(study_1.studyApi.deleteStudy)); // 스터디 정보 삭제(장)
exports.default = router;
