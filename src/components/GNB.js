import Link from "next/link";
import Container from "@/components/Container";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";

export const NavSection = () => {
  const pathname = usePathname(); // 현재 경로 확인

  return (
    <div className="flex items-center text-[#4B5563] gap-4 px-4">
      <Link href="/community">
        <h4
          className={`text-[16px] whitespace-nowrap md:text-lg font-bold ${
            pathname === "/community" ? "text-blue-500" : ""
          }`}
        >
          자유게시판
        </h4>
      </Link>
      <Link href="/community">
        <h4
          className={`text-[16px] whitespace-nowrap md:text-lg font-bold ${
            pathname === "/marketplace" ? "text-[#3692FF]" : ""
          }`}
        >
          중고마켓
        </h4>
      </Link>
    </div>
  );
};

export default function GNB() {
  const isMobile = useMediaQuery("(max-width: 640px)"); // 모바일 체크
  const logoSrc = isMobile ? "/logo_mobile.svg" : "/logo.svg"; // 로고 변경
  return (
    <header className="w-full h-[70px] flex justify-center sticky border-b border-solid border-gray3 border-[1px] px-4">
      <Container className="w-full max-w-full md:max-w-full xl:max-w-[1520px] my-0 mx-2 md:mx-4 xl:mx-[200px] flex items-center justify-between">
        <div className="flex ">
          <Link href="/">
            <Image
              src={logoSrc} // 변경된 로고 적용
              priority
              width={isMobile ? 81 : 150} // 모바일일 때 로고 크기 조정 (선택)
              height={isMobile ? 40 : 51}
              alt="판다마켓"
              className="min-w-[81px] min-h-[40px]"
            />
          </Link>
          <NavSection />
        </div>
        <Link
          href="/login"
          className="whitespace-nowrap bg-[#3692FF] rounded-lg text-white h-[42px] w-[88px] px-1 font-semibold text-[16px] cursor-pointer flex items-center justify-center"
        >
          로그인
        </Link>
      </Container>
    </header>
  );
}
