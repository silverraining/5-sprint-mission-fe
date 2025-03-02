import { useState, useEffect } from "react";
import Comment from "./Comment";

export default function CommentList({ comments = [], articleId }) {
  const [commentList, setCommentList] = useState(comments);

  useEffect(() => {
    const updatedComments = comments.map((comment) => ({
      ...comment,
      username: "뚱이 판다",
    }));

    setCommentList(updatedComments); // 갱신된 댓글 리스트 상태 업데이트
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
    return <p className="text-gray-500">댓글이 없습니다.</p>;
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
