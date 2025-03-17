export const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="flex flex-col justify-center items-center bg-white gap-6 rounded-md shadow-lg w-[327px] h-[220px] md:w-[540px] md:h-[250px] text-center">
        <p className="text-gray-800 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="cursor-pointer bg-[#3692FF] text-white w-[120px] h-[48px] rounded-md"
        >
          확인
        </button>
      </div>
    </div>
  );
};
