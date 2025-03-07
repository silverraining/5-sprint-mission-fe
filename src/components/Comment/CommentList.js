import { useState, useEffect } from "react";
import Comment from "@/components/Comment/Comment";
import Image from "next/image";
import { useType } from "../../contexts/TypeContext";

export default function CommentList({
  comments = [],
  articleId,
  type = "article",
}) {
  const [commentList, setCommentList] = useState(comments);
  const currentType = useType();
  useEffect(() => {
    if (comments.length > 0) {
      const updatedComments = comments.map((comment) => ({
        ...comment,
        username: "뚱이 판다",
      }));
      setCommentList(updatedComments);
    }
  }, [comments]);

  const handleDelete = (deletedCommentId) => {
    const updatedComments = commentList.filter(
      (comment) => comment.id !== deletedCommentId
    );
    setCommentList(updatedComments);
  };

  const handleUpdate = (updatedComment) => {
    const updatedComments = commentList.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    setCommentList(updatedComments);
  };

  const imageSrc =
    currentType === "product" ? "/noInquary.svg" : "/noreply.svg";
  const text = currentType === "product" ? "" : "아직 댓글이 없어요.";

  if (commentList.length === 0) {
    return (
      <div className="flex flex-col items-center mt-8 text-gray-500">
        <Image
          src={imageSrc} // 이미지 소스는 type에 따라 변경
          alt={text}
          width={151}
          height={208}
        />
        <p className="mt-2 text-center text-sm">
          {text} {/* 텍스트도 type에 맞게 변경 */}
          <br />
          {currentType === "article" && "지금 댓글을 달아보세요!"}{" "}
          {/* article일 때만 추가 텍스트 */}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {commentList.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={handleDelete} // 댓글 삭제 핸들러 전달
          onUpdate={handleUpdate} // 댓글 수정 핸들러 전달
          articleId={articleId}
          type={currentType}
        />
      ))}
    </div>
  );
}
