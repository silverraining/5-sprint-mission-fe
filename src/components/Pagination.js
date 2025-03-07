import Image from "next/image";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // 페이지가 1개 이하이면 표시 X

  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`w-10 h-10 mx-1 border rounded-full text-sm font-semibold transition duration-200 ${
          currentPage === i
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-white hover:bg-gray-300"
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4 mb-6">
      {/* 이전 버튼, currentPage가 5 이상일 때만 표시 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex justify-center items-center w-[40px] h-[40px] border rounded-full hover:bg-gray-300 transition duration-200 ${
          currentPage <= 5 ? "invisible" : ""
        }`}
      >
        <Image src="/arrow_left.png" width={24} height={24} />
      </button>

      {pageNumbers}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex justify-center items-center w-[40px] h-[40px] border rounded-full hover:bg-gray-300 transition duration-200"
      >
        <Image src="/arrow_right.png" width={24} height={24} />
      </button>
    </div>
  );
};

export default Pagination;
