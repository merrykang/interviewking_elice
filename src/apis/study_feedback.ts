import { StudyFeedback } from '../models/index';
import { Study } from '../models/index';
import { User } from '../models/index';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'mongoose';

interface CustomRequest extends Request {
  user: any;
}
interface CustomResponse extends Response {
  study_feedback: any;
}

const studyFeedbackApi = {
  /**피드백, 댓글 작성*/
  async newFeedback(req: CustomRequest, res: CustomResponse, next: NextFunction): Promise<void> {
    try {
      const user_id = req.user.user_id;
      console.log(user_id);
      const user = await User.findOne({ _id: user_id });
      if (!user) {
        throw new Error('Not found user');
      }
      const { study_id, content_type, content } = req.body;
      const createInfo = {
        user_id,
        user_name: user.user_name,
        study_id,
        content_type,
        content,
      };

      const createdFeedback = await StudyFeedback.create(createInfo);
      res.study_feedback = createdFeedback;
      res.status(200).json(createdFeedback);
    } catch (error) {
      console.log(error);
      res.status(407).json({
        code: 407,
        message: 'wrong request',
      });
    }
  },

  /**피드백, 댓글 조회(스터디별)*/
  async studyFeedback(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      const { study_id } = req.params;
      const foundFeedback = await StudyFeedback.find({ study_id });
      if (!foundFeedback) throw new Error('Not found study feedback');
      res.status(200).json(foundFeedback);
    } catch (error) {
      console.log(error);
      res.status(408).json({
        code: 408,
        message: 'Not found study feedback',
      });
    }
  },

  /**피드백, 댓글 조회(유저별)*/
  async userFeedback(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      const { user_id } = req.body;
      console.log(user_id);
      const foundFeedback = await StudyFeedback.find({ user_id });
      console.log(foundFeedback);
      if (!foundFeedback) throw new Error('Not found user feedback');
      res.status(200).json(foundFeedback);
    } catch (error) {
      console.log(error);
      res.status(409).json({
        code: 409,
        message: 'Not found user feedback',
      });
    }
  },

  /**피드백, 댓글 수정*/
  async updateFeedback(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      // 유저 권한 판단
      const { study_id, content_type, content } = req.body;
      const user_id = req.user.user_id;
      const foundFeedback = await StudyFeedback.findOne({ user_id, study_id });
      if (!foundFeedback) throw new Error('Not authorizaion');

      // 피드백, 댓글 수정
      const updateInfo = { content_type, content };
      const updatedFeedback = await StudyFeedback.updateOne({ user_id, study_id }, updateInfo);
      res.status(200).json(updatedFeedback);
    } catch (error) {
      console.log(error);
      res.status(410).json({
        code: 410,
        message: 'Not authorizaion',
      });
    }
  },

  /**피드백, 댓글 삭제*/
  async deleteFeedback(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      // 유저 권한 판단
      const { study_id } = req.params;
      const user_id = req.user.user_id;
      const foundFeedback = await StudyFeedback.findOne({ user_id, study_id });
      if (!foundFeedback) throw new Error('Not authorizaion');

      // 피드백, 댓글 삭제
      const deletedFeedback = await StudyFeedback.deleteOne({ user_id, study_id }); // 피드백, 댓글 삭제
      res.study_feedback = deletedFeedback;
      res.status(200).json(deletedFeedback);
    } catch (error) {
      console.log(error);
      res.status(410).json({
        code: 410,
        message: 'Not authorizaion',
      });
    }
  },
};

export { CustomRequest, CustomResponse, studyFeedbackApi };
export default studyFeedbackApi;
