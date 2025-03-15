import Image from "next/image";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`cursor-pointer w-10 h-10 mx-1 border rounded-full text-sm font-semibold transition duration-200 ${
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
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer flex justify-center items-center w-10 h-10 border rounded-full hover:bg-gray-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image src="/arrow_left.png" width={24} height={24} alt="prev" />
      </button>

      {pageNumbers}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer flex justify-center items-center w-10 h-10 border rounded-full hover:bg-gray-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image src="/arrow_right.png" width={24} height={24} alt="next" />
      </button>
    </div>
  );
};

export default Pagination;
