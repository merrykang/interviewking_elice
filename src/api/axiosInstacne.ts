import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://34.22.79.51:5000/api/",
});
