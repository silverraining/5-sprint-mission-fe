import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { Modal } from "@/Common/modals/Modal";
import { useAuth } from "@/contexts/AuthProvider";

export default function RegisterPage() {
  const { join, modalMessage, setModalMessage, isModalOpen, setIsModalOpen } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showpasswordConfirmation, setShowpasswordConfirmation] =
    useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" }); // onChange 모드로 폼 유효성 검사 활성화
  const mutation = useMutation({
    mutationFn: join,
    onSuccess: (data) => {
      localStorage.setItem("userData", JSON.stringify(data));
      window.location.href = "/items";
      setModalMessage("가입이 완료되었어요.");
      setIsModalOpen(true);
    },
    onError: (error) => {
      console.log("BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
      console.log("에러 메시지:", error.message); // 에러 메시지 출력
      const errorMessage =
        error.response.data.message || "회원가입에 실패했습니다.";
      setModalMessage(errorMessage); // 모달 메시지 설정
      setIsModalOpen(true); // 모달 띄우기
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
      await join(data);
      window.location.href = "/login";
      setModalMessage("가입이 완료되었어요. 로그인 해주세요.");
      setIsModalOpen(true);
    } catch (error) {
      console.error("회원가입 실패", error);
      setError("email", { type: "manual", message: "이메일을 확인해주세요." });
      setError("password", {
        type: "manual",
        message: "비밀번호를 확인해주세요.",
      });
      setError("passwordConfirmation", {
        type: "manual",
        message: "비밀번호를 재확인해주세요.",
      });
    }
    // console.log("회원가입 데이터:", data);

    // mutation.mutate({
    //   email: data.email,
    //   nickname: data.nickname,
    //   password: data.password,
    //   passwordConfirmation: data.passwordConfirmation,
    // });
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-20">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={396}
          height={132}
          className="mb-10 min-w-[198px] min-h-[46px] w-auto h-auto max-w-full md:w-[396px] md:h-[132px]"
        />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white min-w-[343px] md:min-w-[640px]"
      >
        {/* 이메일 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">이메일</label>
          <input
            type="email"
            {...register("email", { required: "이메일을 입력해주세요." })}
            className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* 닉네임 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">닉네임</label>
          <input
            type="text"
            {...register("nickname", { required: "닉네임을 입력해주세요." })}
            className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
            placeholder="닉네임을 입력해주세요"
          />
          {errors.nickname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nickname.message}
            </p>
          )}
        </div>

        {/* 비밀번호 입력 */}
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
            className="absolute right-3 top-12 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              src={showPassword ? "/eye-on.svg" : "/eye-off.svg"}
              width={20}
              height={20}
              alt="비밀번호 보기"
            />
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* 비밀번호 확인 입력 */}
        <div className="mb-6 relative">
          <label className="block text-gray-700 font-bold mb-2">
            비밀번호 확인
          </label>
          <input
            type={showpasswordConfirmation ? "text" : "password"}
            {...register("passwordConfirmation", {
              required: "비밀번호를 다시 입력해주세요.",
            })}
            className="w-full p-3 bg-[#F3F4F6] rounded-md focus:ring focus:ring-blue-300"
            placeholder="비밀번호를 다시 입력해주세요"
          />
          <button
            type="button"
            className="absolute right-3 top-12 cursor-pointer"
            onClick={() =>
              setShowpasswordConfirmation(!showpasswordConfirmation)
            }
          >
            <Image
              src={showpasswordConfirmation ? "/eye-on.svg" : "/eye-off.svg"}
              width={20}
              height={20}
              alt="비밀번호 보기"
            />
          </button>
          {errors.passwordConfirmation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          className="w-full bg-[#9CA3AF] mb-6 cursor-pointer text-white rounded-full min-w-[343px] min-h-[56px] font-bold hover:bg-[#3692FF]"
        >
          회원가입
        </button>
      </form>
      {/* 모달 - 이메일 중복 경고 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />

      {/* 간편 로그인 */}
      <div className="w-full max-w-md bg-[#E6F2FF] min-w-[343px] min-h-[74px] md:min-w-[640px] flex rounded-lg px-6 justify-between items-center">
        <div className="text-gray-700 font-semibold">간편 로그인하기</div>
        <div className="flex gap-4 mt-2">
          <Link href="https://www.google.co.kr/">
            <Image
              src="/ic_google.svg"
              width={40}
              height={40}
              alt="Google 로그인"
            />
          </Link>
          <Link href="https://www.kakaocorp.com/page/">
            <Image
              src="/ic_kakao.svg"
              width={40}
              height={40}
              alt="Kakao 로그인"
            />
          </Link>
        </div>
      </div>

      {/* 로그인 페이지로 이동 */}
      <footer className="mt-6 text-sm text-gray-700">
        이미 회원이신가요?{" "}
        <Link href="/login" className="text-[#3182F6] underline">
          로그인
        </Link>
      </footer>
    </div>
  );
}
