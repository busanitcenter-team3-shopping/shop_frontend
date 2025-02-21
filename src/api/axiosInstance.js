import { meta } from "@eslint/js";
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

console.log("API URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
