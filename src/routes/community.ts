import { Router } from 'express';
const router = Router();

import communityApi from "../apis/community";
import userTokenValidate from "../middlewares/userTokenValidate";
// import fileUpload from "../middlewares/fileUpload"; 프론트 구현완료 후 삭제예정
// import fileDownload from "../middlewares/fileDownload"; 프론트 구현완료 후 삭제예정
// import fileModify from "../middlewares/fileModify"; 프론트 구현완료 후 삭제예정

router.get("/list", communityApi.getAllList);
router.get("/detl", communityApi.getContent);
router.delete("/detl", communityApi.deleteContent); //userTokenValidate 프론트 토큰확인 후 추가예정
router.post("/detl", communityApi.postContent);
router.put("/detl", communityApi.modifyContent); //userTokenValidate 프론트 토큰확인 후 추가예정
router.post("/reply", communityApi.postReply);
router.delete("/reply", communityApi.deleteReply); //userTokenValidate 프론트 토큰확인 후 추가예정
//router.get("/download", communityApi.fileDownload); //fileDownload : 프론트 구현완료 후 삭제예정
// router.put("/reply", userTokenValidate, communityApi.modifyReply); //리팩토링 시 사용예정

export default router;