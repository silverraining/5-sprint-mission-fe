import { useState, useEffect } from "react";
import Comment from "./Comment";
const randomUsernames = ["스폰지밥", "뚱이", "다람이", "집게사장", "징징이"];
export default function CommentList({ comments = [] }) {
  const [commentList, setCommentList] = useState(comments);

  useEffect(() => {
    console.log("📌 comments: ", commentList);
    const updatedComments = comments.map((comment) => ({
      ...comment,
      username:
        comment.username ||
        randomUsernames[Math.floor(Math.random() * randomUsernames.length)],
    }));

    setCommentList(updatedComments); // 오타 수정 ✅
  }, [comments]);

  if (comments.length === 0) {
    return <p className="text-gray-500">댓글이 없습니다.</p>;
  }

  return (
    <div className="mt-6">
      {commentList.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
