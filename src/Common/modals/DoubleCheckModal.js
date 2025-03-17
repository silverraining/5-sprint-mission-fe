import Image from "next/image";

export const DoubleCheckModal = ({ isOpen, onClose, onDelete, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="flex flex-col justify-center items-center bg-white gap-6 rounded-md shadow-lg w-[327px] h-[220px] md:w-[540px] md:h-[250px] text-center">
        <Image src="/ic_check.svg" width={24} height={24} />
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="cursor-pointer text-[#F74747] border border-[#F74747] w-[88px] h-[48px] rounded-md"
          >
            취소
          </button>
          <button
            onClick={onDelete}
            className="cursor-pointer bg-[#F74747] text-white w-[88px] h-[48px] rounded-md"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};
