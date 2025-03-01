import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { deleteArticle } from "@/pages/api/articles";

export default function ToggleDropdown({ onEdit, onDelete, articleId }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBtn = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  const handleEdit = () => {
    if (articleId) {
      onEdit(articleId);
    }
  };

  const handleDelete = () => {
    if (articleId) {
      onDelete(articleId); // 부모 컴포넌트로 삭제 요청 전달
    }
  };

  return (
    <div className="relative">
      {/* Image used as the toggle button */}
      <Image
        src="/ic_kebab.svg"
        width={24}
        height={24}
        alt="toggleDropdown"
        onClick={toggleBtn} // Use the image click to toggle the dropdown
        className="cursor-pointer" // Add a pointer cursor to indicate it's clickable
      />
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded-md w-36 h-24">
          <ul className="m-0 p-0 h-full flex flex-col text-[#6B7280] text-[16px]">
            <li
              className="flex items-center justify-center h-1/2 p-2 hover:bg-gray-200 cursor-pointer"
              onClick={handleEdit}
            >
              수정하기
            </li>
            <li
              className="flex items-center justify-center h-1/2 p-2 hover:bg-gray-200 cursor-pointer"
              onClick={handleDelete}
            >
              삭제하기
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
