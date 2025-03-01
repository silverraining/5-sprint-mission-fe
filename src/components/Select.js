import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

const Select = ({ value = "createdAt", onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          "cursor-pointer w-[160px] h-[42px] text-16pt font-regular text-f-gray-500 rounded-[15px] border border-f-gray-200 px-[20px] text-left flex items-center justify-between",
          { "focus:ring-f-green-text focus:ring-[2px]": isOpen }
        )}
      >
        {selectedLabel}
        <Image src="/ic_toggle.png" alt="toggle" width={30} height={30} />
      </button>
      {isOpen && (
        <div className="absolute bg-white w-[160px] rounded-[15px] border border-f-gray-200 z-10 flex flex-col mt-[4px] shadow-md">
          {options.map((item, index) => (
            <button
              key={item.value}
              className={`h-[42px] px-4 text-16pt font-regular text-f-black text-left ${
                index !== 0 && "border-t border-f-gray-200"
              }`}
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
