import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import CommentList from "@/components/Comment/CommentList";
import { addComment } from "@/services/api/comment";

export default function CommentSection({ articleId, comments }) {
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState(comments);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("버튼 클릭됨");
    if (!content.trim()) {
      alert("댓글을 입력해주세요!");
      return;
    }

    try {
      const newComment = await addComment(articleId, content);
      console.log("새 댓글 데이터:", newComment);
      setContent("");
      setCommentList((prev) => [...prev, newComment]);
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            className={`cursor-pointer h-[42px] w-[74px] px-1 font-semibold text-[16px] ${
              content.trim() ? "bg-[#3692FF]" : "bg-[#9CA3AF]"
            }`}
            disabled={!content.trim()}
          >
            등록
          </Button>
        </div>
      </Form>
      <CommentList comments={commentList} articleId={articleId} />
    </div>
  );
}
