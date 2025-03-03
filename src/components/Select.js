import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";

const Select = ({ value = "createdAt", onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const selectedLabel =
    options.find((o) => o.value === value)?.label || "최신순"; // 기본값: 최신순

  const handleClickOption = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          "cursor-pointer whitespace-nowrap h-[42px] min-w-[42px] md:w-[130px] md:min-w-[130px] text-16pt font-regular text-f-gray-500 rounded-[15px] border border-f-gray-200 md:px-[20px] md:text-left flex items-center justify-center md:justify-between",
          { "focus:ring-f-green-text focus:ring-[2px]": isOpen }
        )}
      >
        {!isMobile && selectedLabel}
        <Image
          src={isMobile ? "/ic_sort.svg" : "/ic_arrow_down.svg"}
          alt="toggle"
          width={25}
          height={25}
          className="opacity-100"
        />
      </button>
      {/* 드롭다운 옵션 목록 */}
      {isOpen && (
        <div className="absolute bg-white w-[130px] rounded-[15px] border border-f-gray-200 z-10 flex flex-col mt-[4px] shadow-md right-0 md:right-auto">
          {options.map((item, index) => (
            <button
              key={item.value}
              className={clsx(
                "h-[42px] px-4 text-16pt font-regular text-f-black text-center cursor-pointer transition-all duration-200 ease-in-out",
                index !== 0 && "border-t border-f-gray-200",
                "hover:bg-gray-100"
              )}
              onClick={() => handleClickOption(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
