import Link from "next/link";
import Container from "@/components/Container";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const NavSection = () => {
  const pathname = usePathname(); // 현재 경로 확인

  return (
    <div className="flex items-center text-[#4B5563] gap-4">
      <Link className="mr-4" href="/community">
        <h4
          className={`text-[16px] whitespace-nowrap md:text-lg font-bold ${
            pathname === "/community" ? "text-blue-500" : ""
          }`}
        >
          자유게시판
        </h4>
      </Link>
      <Link href="/marketplace">
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
  return (
    <header className="w-full h-[70px] flex justify-center sticky border-b border-solid border-gray3 border-[1px]">
      <Container className="w-full max-w-full md:max-w-full xl:max-w-[1520px] my-0 mx-4 md:mx-6 xl:mx-[200px] flex items-center justify-between">
        <div className="flex gap-8">
          <Link href="/">
            <Image
              src="/logo.svg"
              priority
              width={150}
              height={26}
              alt="판다마켓"
            />
          </Link>

          <NavSection />
        </div>
        <Button className="bg-[#3692FF] h-[42px] w-[88px] px-1 font-semibold text-[16px]">
          로그인
        </Button>
      </Container>
    </header>
  );
}
