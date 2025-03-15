import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = "http://172.30.1.71:8090";

console.log("API URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    //로컬스토리지에 jwt 토큰이 있으면 헤더에 추가한다.

    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
