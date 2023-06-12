import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    // 개발 환경에서는 proxy를 태우고 그렇지 않은 배포환경에서는 http://34.22.79.51로 api를 요청하게 하는 코드
    process.env.NODE_ENV === "development"
      ? "/api/"
      : "http://34.22.79.51:5000/api/",
  withCredentials: true,
});

// axiosInstance.interceptors.request.use((config) => {
//   // 헤더에 추가할 필요한 내용 설정
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer your_token_here',
//   };

//   // 요청 헤더에 헤더 추가
//   config.headers = headers;

//   return config;
// });
