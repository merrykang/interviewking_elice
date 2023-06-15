import { Router } from 'express';
import { CustomRequest, CustomResponse, studyApi } from '../apis/study';
import userTokenValidate from '../middlewares/userTokenValidate';

import { Request, Response, NextFunction } from 'express';

// CustomRequest, CustomResponse 매개 변수와 형식 맞추어주는 미들웨어
const adaptRequest = (
  handler: (req: CustomRequest, res: CustomResponse, next: NextFunction) => Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const customReq: CustomRequest = req as CustomRequest;
    handler(customReq, res as CustomResponse, next);
  };
};

const router = Router();
// router.use(userTokenValidate);

router.post('/create', userTokenValidate, adaptRequest(studyApi.newStudy)); // 스터디 개설
router.post('/apply', userTokenValidate, adaptRequest(studyApi.applyStudy)); // 스터디 신청
router.put('/accept/:study_id/:member_id', userTokenValidate, adaptRequest(studyApi.acceptStudy)); // 스터디 신청 수락
router.get('/info', adaptRequest(studyApi.getStudy)); // 스터디 정보 조회(전체)
router.get('/info/:study_id', adaptRequest(studyApi.getStudyOne)); // 스터디 정보 조회(스터디별)
router.put('/info/:study_id', userTokenValidate, adaptRequest(studyApi.updateStudy)); // 스터디 정보 수정(장)
router.delete('/', userTokenValidate, adaptRequest(studyApi.leaveUser)); // 스터디 탈퇴
router.delete('/:study_id/:member_id', userTokenValidate, adaptRequest(studyApi.deleteUser)); // 스터디 회원 관리(장)
router.delete('/:study_id', userTokenValidate, adaptRequest(studyApi.deleteStudy)); // 스터디 정보 삭제(장)

export default router;
