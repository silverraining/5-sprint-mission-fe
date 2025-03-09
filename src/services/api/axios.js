import axios from "axios";
const API_URL = "https://sprint-mission08-be.onrender.com";
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true, // 쿠키 전달 설정
  },
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        //accessToken을 읽어서 요청 헤더에 추가 (사용하는 setItem과는 다름)
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // 로그인 페이지로 리디렉트
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
