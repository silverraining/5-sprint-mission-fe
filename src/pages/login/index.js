import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Handle login logic here (e.g., API request)
  };
  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-20">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={396}
          height={132}
          className="mb-10 min-w-[198px] min-h-[46px]  w-auto h-auto max-w-full md:w-[396px] md:h-[132px]"
        />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full max-w-md bg-[white] min-w-[343px] md:min-w-[640px]"
      >
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">이메일</label>
          <input
            type="email"
            {...register("email", { required: "이메일을 입력해주세요." })}
            className=" w-full p-3  rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 font-bold mb-2">비밀번호</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "비밀번호를 입력해주세요." })}
            className="w-full p-3 bg-[#F3F4F6] rounded-md focus:ring focus:ring-blue-300"
            placeholder="비밀번호를 입력해주세요"
          />
          <button
            type="button"
            className="absolute right-3 top-12"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              src={showPassword ? "/eye-on.svg" : "/eye-off.svg"}
              width={20}
              height={20}
              alt="toggle password"
            />
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#9CA3AF] mb-6 cursor-p text-white rounded-full min-w-[343px] min-h-[56px] font-bold hover:bg-[#3692FF]"
        >
          로그인
        </button>
      </form>
      <div className="w-full max-w-md bg-[#E6F2FF] min-w-[343px] min-h-[74px] md:min-w-[640px] flex rounded-lg px-6 justify-between items-center">
        <div className=" text-gray-700 font-semibold">간편 로그인하기</div>
        <div className="flex gap-4 mt-2">
          <Link href="https://www.google.co.kr/">
            <Image
              src="/ic_google.svg"
              width={40}
              height={40}
              alt="Google Login"
            />
          </Link>
          <Link href="https://www.kakaocorp.com/page/">
            <Image
              src="/ic_kakao.svg"
              width={40}
              height={40}
              alt="Kakao Login"
            />
          </Link>
        </div>
      </div>
      <footer className="mt-6 text-sm text-gray-700">
        판다마켓이 처음이신가요?{" "}
        <Link href="/register" className="text-[#3182F6] underline">
          회원가입
        </Link>
      </footer>
    </div>
  );
}
