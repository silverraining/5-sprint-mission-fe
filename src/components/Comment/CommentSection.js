import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import CommentList from "@/components/Comment/CommentList";
import { addComment } from "@/services/api/comment";
import { useType } from "@/contexts/TypeContext";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export default function CommentSection({
  id: propId,
  comments = [],
  label = "댓글달기",
  placeholder = "댓글을 입력해주세요.",
}) {
  const router = useRouter();
  const { id: queryId } = router.query; // useRouter에서 가져오는 id
  const id = propId || queryId; // props로 받은 id가 없으면 router.query.id 사용
  const type = useType();
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["comments", id], // 댓글 데이터 쿼리 키
    queryFn: () => fetchProductComments(id),
    initialData: { list: comments }, // 기본값 설정
  });

  const handleCommentSubmit = async (e) => {
    console.log("Form submitted");
    console.log("Content:", content);

    if (!content.trim()) {
      alert("댓글을 입력해주세요!");
      return;
    }

    if (!id) {
      console.error("댓글을 등록할 대상 ID가 없습니다.");
      return null;
    }
    try {
      const newComment = await addComment(id, content, type);
      // 댓글 등록 후, queryClient를 이용해 댓글 데이터 업데이트 (기존 데이터에 새로운 댓글 추가)
      queryClient.setQueryData(["comments", id], (oldData) => {
        return {
          ...oldData,
          list: [...oldData.list, newComment],
        };
      });

      setContent(""); // 입력값 초기화
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4">
      <form className="space-y-4" onSubmit={handleCommentSubmit}>
        <div className="border-t border-gray-300 my-8 md:max-w-[1200px] md:mx-auto px-4"></div>
        <div className="flex flex-col gap-2 mb-4">
          <Label htmlFor="comment" className="font-bold text-lg">
            {label}
          </Label>
          <Textarea
            id="comment"
            className="bg-[#F3F4F6] placeholder:text-[#9CA3AF] text-black font-medium text-[16px] placeholder:text-[16px] w-full h-[104px] px-6 pt-3"
            placeholder={placeholder}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
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
      </form>
      <CommentList comments={data?.list || comments} id={id} type={type} />
    </div>
  );
}
