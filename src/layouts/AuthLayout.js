import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "@/Common/modals/Modal"; // 모달 컴포넌트 import

export default function AuthLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Access Token:", token);
    if (!token) {
      setIsLoginModalOpen(true); // 토큰이 없으면 로그인 모달을 띄운다
    } else {
      setIsAuthenticated(true); // 인증된 경우
    }
  }, [router]);

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(false); // 모달을 닫고 로그인 페이지로
    router.push("/login");
  };

  if (!isAuthenticated) {
    return (
      <Modal
        isOpen={isLoginModalOpen}
        onClose={handleLoginRedirect} // 모달이 닫히면 로그인 페이지로
        message="로그인 후에 이용 가능합니다."
      />
    );
  }

  return <>{children}</>;
}
