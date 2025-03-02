import Image from "next/image";

import { useState, useEffect, useRef } from "react";

export default function ToggleDropdown({ onEdit, onDelete, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleBtn = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    if (id) {
      onEdit(id);
    }
  };

  const handleDelete = () => {
    if (id) {
      onDelete(id);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Image used as the toggle button */}
      <Image
        src="/ic_kebab.svg"
        width={24}
        height={24}
        alt="toggleDropdown"
        onClick={toggleBtn}
        className="cursor-pointer"
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
