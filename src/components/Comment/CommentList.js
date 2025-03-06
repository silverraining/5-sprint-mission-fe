import { useState, useEffect } from "react";
import Comment from "@/components/Comment/Comment";
import Image from "next/image";

export default function CommentList({ comments = [], articleId }) {
  const [commentList, setCommentList] = useState(comments);

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

  if (commentList.length === 0) {
    return (
      <div className="flex flex-col items-center mt-8 text-gray-500">
        <Image
          src="/noreply.svg" // 댓글 없음 이미지
          alt="아직 댓글이 없어요"
          width={151}
          height={208}
        />
        <p className="mt-2 text-center text-sm">
          아직 댓글이 없어요.
          <br />
          지금 댓글을 달아보세요!
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
        />
      ))}
    </div>
  );
}
