import { useRouter } from "next/router";
import ArticleDetail from "@/components/Article/ArticleDetail";
import CommentSection from "@/components/Comment/CommentSection";
import { deleteArticle } from "@/services/api/articles";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ArticleDetailPage({ article, comments }) {
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   if (!id) return; // id가 없으면 실행 안 함
  //   console.log("id찍어보자: ", id);
  //   async function fetchData() {
  //     try {
  //       const [articleRes, commentsRes] = await Promise.all([
  //         fetch(`https://sprint-mission08-be.onrender.com/articles/${id}`),
  //         fetch(
  //           `https://sprint-mission08-be.onrender.com/articles/${id}/comments`
  //         ),
  //       ]);

  //       if (!articleRes.ok || !commentsRes.ok)
  //         throw new Error("데이터 로드 실패");

  //       const [articleData, commentsData] = await Promise.all([
  //         articleRes.json(),
  //         commentsRes.json(),
  //       ]);

  //       setArticle(articleData);
  //       setComments(commentsData.list);
  //     } catch (error) {
  //       console.error("데이터 가져오기 실패:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, [id]);

  if (!router.isReady) return <div>⏳ 페이지 로딩 중...</div>;
  if (!article) return <div>❌ 게시글을 불러올 수 없습니다.</div>;

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

  return (
    <>
      <ArticleDetail article={article} onDelete={handleDelete} />
      <CommentSection id={article.id} comments={comments} />
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
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const [articleRes, commentsRes] = await Promise.all([
      fetch(`https://sprint-mission08-be.onrender.com/articles/${id}`),
      fetch(`https://sprint-mission08-be.onrender.com/articles/${id}/comments`),
    ]);

    if (!articleRes.ok || !commentsRes.ok) throw new Error("데이터 로드 실패");

    const [article, commentsData] = await Promise.all([
      articleRes.json(),
      commentsRes.json(),
    ]);
    console.log("서버에서 받은 article 데이터:", article);
    console.log("서버에서 받은 comments 데이터:", commentsData.list);
    return {
      props: {
        article,
        comments: commentsData.list,
      },
    };
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return {
      props: {
        article: null,
        comments: [],
      },
    };
  }
}
