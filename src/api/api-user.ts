import { setCookie } from "cookies-utils";
import { axiosInstance } from "./axiosInstance";
// axios.defaults.withCredentials = true;

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */

/** 1. 회원가입 POST */
export const postSignUp = async (
  user_name: string,
  email: string,
  password: string,
  passwordCheck: string
) => {
  const response = await axiosInstance.post("user/register", {
    user_name,
    email,
    password,
    passwordCheck,
  });
  console.log("회원가입 데이터:", response.data);
  return response;
};

/** 2. 로그인 POST */
type PostSignIn = {
  email: string;
  password: string;
};
export const postSignIn = async ({ email, password }: PostSignIn) => {
  const response = await axiosInstance.post("user/login", {
    email,
    password,
  });
  console.log("로그인 데이터:", response.data); // 응답 데이터 출력
};
// export const postSignIn = async (email: string, password: string) => {
//   const response = await axiosInstance.post("user/login", {
//     email,
//     password,
//   });
//   console.log("로그인 데이터:", response.data); // 응답 데이터 출력

//   const { resultCode, message, data } = response.data;
//   const { user_id, token } = data;
//   setCookie("token", token, { path: "/" });
//   console.log("Token:", token);

//   return response;
// };

/** 3. 내 정보 조회 GET */
export const getUserData = async () => {
  const response = await axiosInstance.get(`user/mypage`, {
    withCredentials: true,
  });
  return response;
};

/** 4. 내 정보 수정 PUT */
export const putUserData = async (
  email: string,
  password: string,
  intro_yn: string,
  phone_number: string,
  token: string
) => {
  const response = await axiosInstance.put("user/mypage", {
    data: { email, password, intro_yn, phone_number },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

/** 5. 회원탈퇴 DELETE */
export const deleteUser = async (
  user_id: string,
  email: string,
  password: string,
  token: string
) => {
  const response = await axiosInstance.delete("user/mypage", {
    data: { user_id, email, password },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
