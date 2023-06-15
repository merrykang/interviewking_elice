"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var community_1 = require("../apis/community");
// import fileUpload from '../middlewares/fileUpload';
// import fileDownload from '../middlewares/fileDownload';
// import fileModify from '../middlewares/fileModify';
var userTokenValidate_1 = require("../middlewares/userTokenValidate");
// router.use(userTokenValidate);
router.get('/list', community_1.default.getAllList);
router.post('/detl', community_1.default.postContent); //fileUpload
router.get('/detl', community_1.default.getContent);
router.put('/detl', userTokenValidate_1.default, community_1.default.modifyContent); //fileModify
router.delete('/detl', userTokenValidate_1.default, community_1.default.deleteContent);
//router.get("/download", communityApi.fileDownload); //fileDownload
router.post('/reply', community_1.default.postReply);
router.put('/reply', userTokenValidate_1.default, community_1.default.modifyReply);
router.delete('/reply', userTokenValidate_1.default, community_1.default.deleteReply);
exports.default = router;
