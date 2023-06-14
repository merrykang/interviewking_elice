import { Community, CommunityReply, User } from '../models';
import { Request, Response, NextFunction } from 'express';

export const communityApi = {
  /** 전체목록조회 */
  async getAllList(req: Request, res: Response) {
    try {
      /** 페이지네이션 : 리팩토링 시 사용예정 */
      // const { page, limit } = req.query; // 클라이언트에서 요청한 페이지 번호와 페이지당 아이템 수
      // const pageNumber = parseInt(page) || 1; // 페이지 번호, 기본값 1
      // const itemsPerPage = parseInt(limit) || 10; // 페이지당 아이템 수, 기본값 10

      // const totalItems = await Community.countDocuments(); // 전체 아이템 수
      // const totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수

      // const skipItems = (pageNumber - 1) * itemsPerPage; // 건너뛸 아이템 수

      // const findContent = await Community.find({})
      //   .skip(skipItems)
      //   .limit(itemsPerPage);

      const findContent = await Community.find({});

      if (!findContent) {
        return res.status(400).json({ message: '목록조회 실패' });
      }

      return res.status(200).json({
        message: '목록조회 성공',
        data: findContent,
      });
    } catch (err) {
      console.log(err);
      if (typeof err === 'string' || err === undefined) {
        throw new Error(err);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  },

  /** 게시글등록 */
  async postContent(req: Request, res: Response) {
    try {
      const { user_id, title, content } = req.body;
      const findUser = await User.findOne({ _id: user_id }).populate('_id').exec();
      const user_name = findUser.user_name;

      const file_etag = req.body.file_etag;
      const file_name = req.body.file_name;
      const file_key = req.body.file_key;

      /** 게시글번호 순차부여 */
      async function getLastCommunityId() {
        const lastCommunity = await Community.findOne().sort({ community_id: -1 }).limit(1).exec();
        if (lastCommunity) {
          return lastCommunity.community_id;
        }
        return 1;
      }

      /** 게시글번호 생성 */
      const lastCommunityId = await getLastCommunityId();
      const newCommunityId = lastCommunityId + 1;

      const newContent = await Community.create({
        community_id: newCommunityId,
        user_id,
        user_name,
        title,
        content,
        file_key,
        file_etag,
        file_name,
      });

      if (!newContent) {
        return res.status(400).json({ message: '게시글생성 실패' });
      }

      return res.status(200).json({
        message: '게시글등록 성공',
        data: newContent,
      });
    } catch (err) {
      if (typeof err === 'string' || err === undefined) {
        throw new Error(err);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  },

  /** 게시글조회(개별) : 게시글+댓글+첨부파일 */
  async getContent(req: Request, res: Response) {
    try {
      const { community_id, user_id } = req.query;
      const findContent = await Community.find({ community_id });
      const findReply = await CommunityReply.find({ community_id });

      if (!findContent) {
        return res.status(400).json({ message: '게시글조회 실패' });
      }

      /** read_users 배열에 게시글을 조회한 user_id 추가 */
      const updateContent = await Community.findOneAndUpdate(
        { community_id },
        { $addToSet: { read_users: user_id } },
        { new: true },
      );

      return res.status(200).json({
        message: '게시글조회 성공',
        data: { updateContent, findReply },
      });
    } catch (err) {
      console.log(err);
      if (typeof err === 'string' || err === undefined) {
        throw new Error(err);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
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
  async modifyContent(req: Request, res: Response) {
    try {
      const { community_id, title, content, file_etag, file_name, file_key } = req.body;
      const findContent = await Community.findOne({ community_id });

      // token 확인 후 업데이트예정
      // const user_id = req.user.user_id;
      // const { user_id } = req.user;
      // console.log('userTokenValidate: ', userTokenValidate);
      // if(!user_id){
      //     return res.status(400).json({ message: "유효하지 않은 사용자" });
      // }

      if (!findContent) {
        return res.status(400).json({ message: '게시글찾기 실패' });
      }

      const updateContent = await Community.findOneAndUpdate(
        { community_id },
        {
          title,
          content,
          file_key,
          file_etag,
          file_name,
        },
        { new: true },
      );

      if (!updateContent) {
        return res.status(400).json({ message: '게시글수정 실패' });
      }

      return res.status(200).json({
        message: '게시글수정 성공',
        data: updateContent,
      });
    } catch (err) {
      console.log(err);
      if (typeof err === 'string' || err === undefined) {
        throw new Error(err);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  },

  /** 게시글삭제 */
  async deleteContent(req: Request, res: Response) {
    try {
      const findContent = await Community.findOne({ community_id: req.query.community_id });

      // token 확인 후 업데이트예정
      // const user_id = req.user.user_id;
      // const { user_id } = req.user;
      // console.log('userTokenValidate: ', userTokenValidate);
      // if(!user_id){
      //     return res.status(400).json({ message: "유효하지 않은 사용자" });
      // }

      if (!findContent) {
        return res.status(400).json({ message: '게시글삭제 실패' });
      }

      const deleteContent = await Community.deleteOne({ community_id: req.query.community_id });

      return res.status(200).json({
        message: '게시글삭제 성공',
      });
    } catch (err) {
      console.log(err);
      if (typeof err === 'string' || err === undefined) {
        throw new Error(err);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  },

  /** 댓글등록 */
  async postReply(req: Request, res: Response) {
    try {
      const { reply_user_id, reply_content, community_id } = req.body;
      const findUser = await User.findOne({ _id: reply_user_id }).populate('_id').exec();
      const reply_user_name = findUser.user_name;

      /** 댓글번호 순차부여 */
      async function getLastCommunityId() {
        const lastCommunity = await CommunityReply.findOne().sort({ reply_id: -1 }).limit(1).exec();
        if (lastCommunity) return lastCommunity.reply_id;
        return 1;
      }

      /** 댓글번호 생성 */
      const lastCommunityId = await getLastCommunityId();
      const newCommunityId = lastCommunityId + 1;

      const newContent = await CommunityReply.create({
        reply_id: newCommunityId,
        reply_user_id,
        reply_user_name,
        reply_content,
        community_id,
      });

      if (!newContent) {
        return res.status(400).json({ message: '댓글등록 실패' });
      }

      return res.status(200).json({
        message: '댓글등록 성공',
        data: newContent,
      });
    } catch (err) {
      console.log(err);
      if (typeof err === 'string' || err === undefined) {
        throw new Error(err);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  },

  /** 댓글수정 */
  async modifyReply(req: Request, res: Response) {
    try {
      const { reply_id, reply_content } = req.body;
      const findReply = await CommunityReply.findOne({ reply_id });

      // token 확인 후 업데이트예정
      // const user_id = req.user.user_id;
      // const { user_id } = req.user;
      // console.log('userTokenValidate: ', userTokenValidate);
      // if(!user_id){
      //     return res.status(400).json({ message: "유효하지 않은 사용자" });
      // }

      if (!findReply) {
        return res.status(400).json({ message: '댓글수정 실패' });
      }

      const updateContent = await CommunityReply.findOneAndUpdate(
        { reply_id: findReply.reply_id },
        {
          reply_content,
        },
        { new: true },
      );

      return res.status(200).json({
        message: '댓글수정 성공',
        data: updateContent,
      });
    } catch (err) {
      console.log(err);
      if (typeof err === 'string' || err === undefined) {
        throw new Error(err);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  },

  /** 댓글삭제 */
  async deleteReply(req: Request, res: Response) {
    try {
      const findReply = await CommunityReply.findOne({ reply_id: req.query.reply_id });

      // token 확인 후 업데이트예정
      // const user_id = req.user.user_id;
      // const { user_id } = req.user;
      // console.log('userTokenValidate: ', userTokenValidate);
      // if(!user_id){
      //     return res.status(400).json({ message: "유효하지 않은 사용자" });
      // }

      if (!findReply) {
        return res.status(400).json({ message: '댓글삭제 실패' });
      }

      const deleteContent = await CommunityReply.deleteOne({ reply_id: req.query.reply_id });

      return res.status(200).json({
        message: '댓글삭제 성공',
      });
    } catch (err) {
      console.log(err);
      if (typeof err === 'string' || err === undefined) {
        throw new Error(err);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  },
};
