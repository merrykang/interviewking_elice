import { axiosInstance } from "./axiosInstacne";
// axiosInstance.defaults.withCredentials = true;

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */

/** 피드백, 댓글 작성  post */
export const postFeedback = async (content_type: number, content: string) => {
  const response = await axiosInstance.post(`feedback/create`, {
    content_type,
    content,
  });
  return response;
};

/** 피드백, 댓글 조회 (스터디별)  get */
export const getFeedbackDataByStudyId = async (study_id: string) => {
  const response = await axiosInstance.get(`feedback/${study_id}`);
  return response;
};

/** 피드백, 댓글 조회 (유저별)   get */
export const getFeedbackDataByUserId = async (user_id: string) => {
  const response = await axiosInstance.get(`feedback/${user_id}`);
  return response;
};

/** 피드백, 댓글 수정  put */
export const putFeedbackByUserId = async (
  user_id: string,
  data: { content_type: number; content: string }
) => {
  const response = await axiosInstance.put(`feedback/${user_id}`, {
    content_type: data.content_type,
    content: data.content,
  });
  return response;
};

/** 피드백, 댓글 삭제  delete */
export const deleteFeedbackByUserId = async (user_id: string) => {
  const response = await axiosInstance.delete(`feedback/${user_id}`);
  return response;
};
