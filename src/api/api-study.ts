import { QueryFunction, QueryFunctionContext, QueryKey } from "react-query";
import { axiosInstance } from "./axiosInstance";
// axios.defaults.withCredentials = true;

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */

/** 1. 스터디 개설 (장) post */
export const postCreateStudy = async (
  study_name: string,
  title: string,
  content: string,
  deadline: string,
  headcount: number,
  chat_link: string,
  status: number
) => {
  const response = await axiosInstance.post("study/create", {
    study_name,
    title,
    content,
    deadline,
    headcount,
    chat_link,
    status,
  });
  return response;
};

/** 2. 스터디 신청 (원) post */
export const postApplyStudy = async (study_id: string, goal: string) => {
  const response = await axiosInstance.post("study/apply", {
    study_id,
    goal,
  });
  return response;
};

/** 3. 스터디 신청 수락 (장)  put */
export const putAcceptStudy = async (study_id: number, accept: number) => {
  const response = await axiosInstance.put(`study/accept/${study_id}`, {
    accept,
  });
  return response;
};

/** 4. 스터디 정보 조회 (전체)  get */
export const getInfoAllStudyData = async () => {
  const response = await axiosInstance.get("study/info");
  return response;
};

/** 5. 스터디 정보 조회 (개별)  get */
export const getInfoStudyData1: QueryFunction<any, string[]> = async ({
  queryKey,
}: QueryFunctionContext<string[]>) => {
  if (queryKey.length !== 2) {
    throw new Error("Invalid queryKey");
  }

  const study_id = queryKey[1];
  const response = await axiosInstance.get(`study/info/${study_id}`);
  console.log(response);
  return response.data;
};

/** 5. 스터디 정보 조회 (개별)  get */
export const getInfoStudyData = async (study_id: string) => {
  const response = await axiosInstance.get(`study/info/${study_id}`);
  return response;
};

/** 6. 스터디 정보 수정 (장)  get */
export const putInfoStudy = async (
  study_id: string,
  data: {
    study_name: string;
    title: string;
    content: string;
    deadline: string;
    headcount: number;
    chat_link: string;
    status: number;
  }
) => {
  const response = await axiosInstance.put(`info/${study_id}`, {
    study_name: data.study_name,
    title: data.title,
    content: data.content,
    deadline: data.deadline,
    headcount: data.headcount,
    chat_link: data.chat_link,
    status: data.status,
  });
  return response;
};

/** 7. 스터디 회원 관리 (장)  get */
export const deleteStudyMember = async (member_id: string) => {
  const response = await axiosInstance.delete(`study/${member_id}`);
  return response;
};

/** 8. 스터디 삭제 (장)  get */
export const deleteStudy = async (study_id: string) => {
  const response = await axiosInstance.delete(`study/info/${study_id}`);
  return response;
};
