import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "@/Common/modals/Modal";
import { TypeProvider } from "@/contexts/TypeContext";

export default function AuthRedirectLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // 이미 토큰이 있는 경우 로그인/회원가입 페이지로 접근할 수 없고 /items 페이지로 리디렉션
    if (token) {
      router.replace("/items");
    } else {
      setIsLoginModalOpen(true);
    }
  }, [router]);

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(false);
    router.push("/login");
  };

  if (!isAuthenticated) {
    return (
      <Modal
        isOpen={isLoginModalOpen}
        onClose={handleLoginRedirect}
        message="로그인 후에 이용 가능합니다."
      />
    );
  }

  return <TypeProvider type="product">{children}</TypeProvider>;
}
