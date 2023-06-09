import axios from "axios";
// axios.defaults.withCredentials = true;

/** 스터디 개설 (장) post */
export const postCreateStudy = async (
  study_name: string,
  title: string,
  content: string,
  deadline: string,
  headcount: number,
  chat_link: string,
  status: number
): Promise<void> => {
  try {
    const result = await axios.post(
      "http://34.22.79.51:5000/api/study/create",
      {
        study_name,
        title,
        content,
        deadline,
        headcount,
        chat_link,
        status,
      }
    );
    console.log(result);
    // 원하는 방식으로 결과를 처리할 수 있습니다.
  } catch (error) {
    console.error(error);
  }
};

/** 스터디 신청 (원) post */
export const postApplyStudy = async (
  study_id: string,
  goal: string
): Promise<void> => {
  try {
    const result = await axios.post("http://34.22.79.51:5000/api/study/apply", {
      study_id,
      goal,
    });
    console.log(result);
    // 원하는 방식으로 결과를 처리할 수 있습니다.
  } catch (error) {
    console.error(error);
  }
};

/** 스터디 신청 수락 (장)  put */
export const putAcceptStudy = async (study_id: number, accept: number) => {
  const result = await axios.put(
    `http://34.22.79.51:5000/api/study/accept/${study_id}`,
    { accept }
  );
  return result;
};

/** 스터디 정보 조회 (전체)  get */
export const getInfoAllStudyData = async () => {
  const result = await axios.get("http://34.22.79.51:5000/api/study/info");
  return result;
};

/** 스터디 정보 조회 (개별)  get */
export const getInfoStudyData = async (study_id: string) => {
  const result = await axios.get(
    `http://34.22.79.51:5000/api/study/info/${study_id}`
  );
  return result;
};

/** 스터디 정보 수정 (장)  get */
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
  const result = await axios.put(
    `http://34.22.79.51:5000/api/info/${study_id}`,
    {
      study_name: data.study_name,
      title: data.title,
      content: data.content,
      deadline: data.deadline,
      headcount: data.headcount,
      chat_link: data.chat_link,
      status: data.status,
    }
  );
  return result;
};

/** 스터디 회원 관리 (장)  get */
export const deleteStudyMember = async (member_id: string) => {
  const result = await axios.delete(
    `http://34.22.79.51:5000/api/study/${member_id}`
  );
  return result;
};

/** 스터디 삭제 (장)  get */
export const deleteStudy = async (study_id: string) => {
  const result = await axios.delete(
    `http://34.22.79.51:5000/api/study/info/${study_id}`
  );
  return result;
};
