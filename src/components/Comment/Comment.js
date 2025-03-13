import { useState } from "react";
import Image from "next/image";
import ToggleDropdown from "../ToggleDropdown";
import { useRouter } from "next/router";
import { updateComment, deleteComment } from "@/services/api/comment";
const defaultProfile = "/ic_profile.png";

export default function Comment({ comment, onDelete, articleId, onUpdate }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  // 수정 모드로 전환
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedComment = await updateComment(
        "ARTICLE", // 또는 'PRODUCT'
        articleId,
        comment.id,
        editedContent
      );
      onUpdate(updatedComment); // 부모 컴포넌트에서 댓글 리스트 업데이트
      setIsEditing(false);
    } catch (err) {
      console.error("댓글 수정 실패:", err);
    }
  };

  // 수정 취소
  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(comment.content); // 원래 댓글 내용으로 되돌리기
  };

  // 댓글 삭제
  const handleDelete = async () => {
    try {
      await deleteComment("ARTICLE", articleId, comment.id);
      onDelete(comment.id); // 부모 컴포넌트에서 댓글 리스트 상태를 갱신
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  return (
    <div className="bg-[#fcfcfc] p-4 mb-4 border-b gap-6">
      <div className="flex justify-between items-center pb-8">
        {/* 댓글 내용 */}
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full bg-[#F3F4F6] p-2  rounded-lg"
          />
        ) : (
          <p className="mt-2 text-gray-800">{comment.content}</p>
        )}

        <ToggleDropdown
          id={comment.id}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {isEditing && (
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className=" text-[#737373] text-[16px] font-semibold px-4 py-2 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="bg-[#3692FF] text-white text-[16px] font-semibold px-4 py-2 rounded-lg"
          >
            수정 완료
          </button>
        </div>
      )}

      <div className="flex justify-start items-center gap-4">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={defaultProfile}
            alt="Default User"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col items-start space-x-2 gap-2 text-sm text-gray-500">
          <span>{comment.username || "뚱이 판다"}</span>
          <span>1시간 전</span>
        </div>
      </div>
    </div>
  );
}
