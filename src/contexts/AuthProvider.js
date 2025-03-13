import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/services/api/axios";
import { signIn } from "@/services/api/auth";
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // 브라우저에서 accessToken 확인하여 로그인 상태 유지
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);
  async function login({ email, password }) {
    if (!email || !password) {
      console.error("이메일 또는 비밀번호를 입력해주세요.");
      setModalMessage("이메일 또는 비밀번호를 입력해주세요.");
      setIsModalOpen(true);
      return;
    }
    try {
      const res = await signIn({ email, password });
      const { accessToken, user } = res.data;

      if (accessToken && user) {
        localStorage.setItem("accessToken", accessToken); // 토큰 저장
        console.log(accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("로그인 성공:", accessToken);
        console.log(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(
        "로그인 실패:",
        error.response ? error.response.data : error.message
      );
      throw new Error("로그인 실패");
    }
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 함");
  }
  return context;
}
