import { Button } from "@/components/ui/button";
import ArticleCreateForm from "@/components/ArticleCreateForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchArticleById, updateArticle } from "@/pages/api/articles";

export default function ArticleEditPage() {
  const router = useRouter();
  const { id } = router.query; // URL에서 id를 받음

  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);

  // 데이터 불러오기
  useEffect(() => {
    if (!id) return; // id가 없으면 실행 안 함

    async function fetchData() {
      try {
        const article = await fetchArticleById(id); // id로 게시글 데이터를 가져옴
        setFormData({
          title: article.title,
          content: article.content,
        });
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        alert("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 수정 버튼 클릭 시 API 요청 및 페이지 이동
  const handleClick = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      // updateArticle로 수정된 데이터를 서버에 전송
      await updateArticle(id, formData);

      // 수정이 완료되면 상세 페이지로 이동 (해당 id의 게시글 상세 페이지로 이동)
      router.push(`/community/${id}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };
  const isFormValid =
    formData.title.trim() !== "" && formData.content.trim() !== "";

  if (loading) return <div>⏳ 로딩 중...</div>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-[20px]">게시글 수정</h1>
        <Button
          className={`h-[42px] w-[74px] px-1 font-semibold text-[16px] ${
            isFormValid ? "bg-[#3692FF]" : "bg-[#9CA3AF]"
          }`}
          onClick={handleClick}
          disabled={!isFormValid}
        >
          수정
        </Button>
      </div>

      <div>
        {/* 입력값과 변경 핸들러를 ArticleCreateForm으로 전달 */}
        <ArticleCreateForm formData={formData} onChange={handleChange} />
      </div>
    </div>
  );
}
