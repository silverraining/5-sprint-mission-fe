import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp } from "@/services/api/auth";
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  join: () => {},
  modalMessage: "", // modalMessage 추가
  setModalMessage: () => {}, // setModalMessage 추가
});

export function AuthProvider({ children }) {
  const [modalMessage, setModalMessage] = useState(""); // 상태 관리
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setModalMessage("로그인 실패");
      setIsModalOpen(true);
      throw new Error("로그인 실패");
    }
  }

  // 회원가입 함수 추가
  async function join({ email, password, nickname, passwordConfirmation }) {
    if (!email || !password || !nickname || !passwordConfirmation) {
      console.error("모든 필드를 입력해주세요.");
      setModalMessage("모든 필드를 입력해주세요.");
      setIsModalOpen(true);
      return;
    }
    try {
      const res = await signUp({
        email,
        password,
        nickname,
        passwordConfirmation,
      });
      const { accessToken, user } = res.data;

      if (accessToken && user) {
        localStorage.setItem("accessToken", accessToken); // 토큰 저장
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
      }
    } catch (error) {
      const errorMessage =
        error.response.data.message || "회원가입에 실패했습니다.";

      console.error("회원가입 실패:", errorMessage);
      setModalMessage(errorMessage);
      setIsModalOpen(true); // 실패 시 모달 열기
      throw new Error("회원가입 실패");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        join,
        modalMessage,
        setModalMessage,
        isModalOpen,
        setIsModalOpen,
      }}
    >
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
