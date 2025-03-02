import { Button } from "@/components/ui/button";
import ArticleCreateForm from "@/components/ArticleCreateForm";
import { useState } from "react";
import { useRouter } from "next/router";
import { createArticle } from "@/pages/api/articles.js";

export default function Registration() {
  const router = useRouter();

  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 등록 버튼 클릭 시 API 요청 및 페이지 이동
  const handleClick = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      const newArticle = await createArticle(formData);
      const articleId = newArticle.id;

      // 상세페이지로 이동
      router.push(`/community/${articleId}`);
    } catch (error) {
      console.error("게시글 생성 실패:", error);
      alert("게시글 생성 중 오류가 발생했습니다.");
    }
  };
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="font-bold text-[20px]">게시글 쓰기</h1>
          <Button
            className="bg-[#9CA3AF] h-[42px] w-[74px] px-1 font-semibold text-[16px]"
            onClick={handleClick}
          >
            등록
          </Button>
        </div>

        <div>
          {/* 입력값과 변경 핸들러를 ArticleCreateForm으로 전달 */}
          <ArticleCreateForm formData={formData} onChange={handleChange} />
        </div>
      </div>
    </>
  );
}
