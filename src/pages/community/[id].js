import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ToggleDropdown from "@/components/ToggleDropdown.js";
import Image from "next/image";
import dayjs from "dayjs";
import HeartTag from "@/components/HeartTag";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CommentList from "@/components/Comment/CommentList";
import { Textarea } from "@/components/ui/textarea";
import { deleteArticle } from "@/services/api/articles";
import Link from "next/link";
import { addComment } from "../../services/api/comment";

export default function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!id) return; // id가 없으면 실행 안 함
    console.log("id찍어보자: ", id);
    async function fetchData() {
      try {
        const [articleRes, commentsRes] = await Promise.all([
          fetch(`https://sprint-mission08-be.onrender.com/articles/${id}`),
          fetch(
            `https://sprint-mission08-be.onrender.com/articles/${id}/comments`
          ),
        ]);

        if (!articleRes.ok || !commentsRes.ok)
          throw new Error("데이터 로드 실패");

        const [articleData, commentsData] = await Promise.all([
          articleRes.json(),
          commentsRes.json(),
        ]);

        setArticle(articleData);
        setComments(commentsData.list);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <div>⏳ 로딩 중...</div>;
  if (!article) return <div>❌ 게시글을 불러올 수 없습니다.</div>;

  const username = article.username || "귀여운 판다";
  // 수정 페이지로 이동하는 함수
  const handleEdit = (articleId) => {
    if (articleId) {
      router.push(`/community/article/edit?id=${articleId}`);
    }
  };
  // 삭제 처리 함수
  const handleDelete = async (articleId) => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await deleteArticle(articleId); // 삭제 API 호출
        alert("정상적으로 삭제되었습니다.");
        router.push("/community"); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      alert("댓글을 입력해주세요!");
      return;
    }

    try {
      const newComment = await addComment(id, commentText);
      setCommentText(""); // 입력 필드 초기화
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  // 댓글 입력이 있을 경우 등록 버튼 활성화 여부 확인
  const isCommentValid = commentText.trim() !== "";
  return (
    <>
      <section className="pb-2 max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between pb-2">
          <h2 className="font-bold text-xl">{article.title}</h2>
          <ToggleDropdown onEdit={handleEdit} id={id} onDelete={handleDelete} />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="/ic_profile.png"
            width={40}
            height={40}
            alt="defaultProfile"
          />
          <span>{username}</span>
          <span className="text-[#4B5563] font-medium">
            {article.username} &nbsp;
            <span className="text-[#9CA3AF] font-normal">
              {dayjs(article.createdAt).format("YYYY.MM.DD")}
            </span>
          </span>
          <div className="border-l border-gray-300 mx-2 h-8"></div>
          <HeartTag favoriteCnt={article.favoriteCnt} />
        </div>
      </section>
      <div className="border-t border-gray-300 my-2 mb-4 max-w-[1200px] mx-auto"></div>
      <div className="mb-6 max-w-[1200px] mx-auto px-4">
        <p>{article.content}</p>
      </div>
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Form className="space-y-4" onSubmit={handleCommentSubmit}>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="comment" className="font-bold text-lg">
              댓글달기
            </Label>
            <Textarea
              id="comment"
              className="bg-[#F3F4F6] font-medium text-[16px] w-full h-[104px] px-6 pt-3"
              placeholder="댓글을 입력해주세요."
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              type="button"
              className={`cursor-pointer bg-[#9CA3AF] h-[42px] w-[74px] px-1 font-semibold text-[16px] ${
                isCommentValid ? "bg-[#3692FF]" : "bg-[#9CA3AF]"
              }`}
              onClick={handleCommentSubmit}
              disabled={!isCommentValid}
            >
              등록
            </Button>
          </div>
        </Form>
      </div>
      <div className="max-w-[1200px] mx-auto px-4">
        <CommentList comments={comments} articleId={id} />
      </div>
      <Link
        href="/community"
        className="block text-center mt-12 w-[240px] mx-auto"
      >
        <img
          src="/btn_back.svg"
          alt="목록으로 돌아가기"
          width={240}
          height={48}
          className=" cursor-pointer"
        />
      </Link>
    </>
  );
}
