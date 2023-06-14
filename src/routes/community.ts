import { Router } from 'express';
const router = Router();

import communityApi from '../apis/community';
import fileUpload from '../middlewares/fileUpload';
import fileDownload from '../middlewares/fileDownload';
import fileModify from '../middlewares/fileModify';
import userTokenValidate from '../middlewares/userTokenValidate';

router.get('/list', communityApi.getAllList);
router.post('/detl', communityApi.postContent); //fileUpload
router.get('/detl', communityApi.getContent);
router.put('/detl', userTokenValidate, communityApi.modifyContent); //fileModify
router.delete('/detl', userTokenValidate, communityApi.deleteContent);
//router.get("/download", communityApi.fileDownload); //fileDownload
router.post('/reply', communityApi.postReply);
router.put('/reply', userTokenValidate, communityApi.modifyReply);
router.delete('/reply', userTokenValidate, communityApi.deleteReply);

export default router;
