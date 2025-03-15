import { useState } from "react";
import Image from "next/image";
import ToggleDropdown from "../ToggleDropdown";
import { useRouter } from "next/router";
import { updateComment, deleteComment } from "@/services/api/comment";
import { timeAgo } from "@/lib/timeAgo";
import { DoubleCheckModal } from "@/Common/modals/DoubleCheckModal";
import { Modal } from "@/Common/modals/Modal";
const defaultProfile = "/ic_profile.png";

export default function Comment({ comment, onDelete, id, onUpdate, type }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  console.log(userId);
  console.log(comment.writer.id);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  // 수정 모드로 전환
  const handleEdit = () => {
    if (comment.writer.id !== userId) {
      setIsPermissionModalOpen(true); // 권한 없으면 모달 열기
      return;
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedComment = await updateComment(comment.id, editedContent);
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
  const handleDelete = () => {
    if (comment.writer.id !== userId) {
      setIsPermissionModalOpen(true); // 권한 없으면 모달 열기
      return;
    }
    setIsModalOpen(true); // 권한 있으면 삭제 확인 모달 열기
  };

  // 댓글 삭제 실행
  const confirmDelete = async () => {
    try {
      await deleteComment(comment.id);
      onDelete(comment.id);
      setIsModalOpen(false);
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  // 모달 닫기
  const cancelDelete = () => {
    setIsModalOpen(false); // 취소 시 모달 닫기
  };
  // 권한 모달 닫기
  const cancelPermissionModal = () => {
    setIsPermissionModalOpen(false);
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
            className="cursor-pointer text-[#737373] text-[16px] font-semibold px-4 py-2 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer bg-[#3692FF] text-white text-[16px] font-semibold px-4 py-2 rounded-lg"
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
          <span>{comment.writer.nickname || "뚱이 판다"}</span>
          <div className="text-[#9CA3AF]">{timeAgo(comment.createdAt)}</div>
        </div>
      </div>
      {/* 권한 모달 */}
      <Modal
        isOpen={isPermissionModalOpen}
        onClose={cancelPermissionModal}
        message="작성자만 이용이 가능한 기능입니다."
      />

      {/* 댓글 삭제 모달 */}
      <DoubleCheckModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onDelete={confirmDelete}
        message="정말로 댓글을 삭제하시겠어요?"
      />
    </div>
  );
}
