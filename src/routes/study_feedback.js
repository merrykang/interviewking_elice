"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var study_feedback_1 = require("../apis/study_feedback");
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
router.post('/create', userTokenValidate_1.default, adaptRequest(study_feedback_1.studyFeedbackApi.newFeedback)); // 피드백 게시글, 댓글 작성
router.get('/:study_id', adaptRequest(study_feedback_1.studyFeedbackApi.studyFeedback)); // 피드백 게시글, 댓글 조회(스터디별)
router.get('/', adaptRequest(study_feedback_1.studyFeedbackApi.userFeedback)); // 피드백 게시글, 댓글 조회
router.put('/', userTokenValidate_1.default, adaptRequest(study_feedback_1.studyFeedbackApi.updateFeedback)); // 피드백 게시글, 댓글 수정
router.delete('/:study_id', userTokenValidate_1.default, adaptRequest(study_feedback_1.studyFeedbackApi.deleteFeedback)); // 피드백 게시글, 댓글 삭제
exports.default = router;
