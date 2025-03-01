const SearchBar = ({ value, onChange }) => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()} // 새로고침 방지
      className="flex items-center w-full max-w-[400px] border border-gray-300 rounded-[10px] p-2"
    >
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={value} // 부모에서 받은 검색어 상태
        onChange={(e) => onChange(e.target.value)} // 부모에서 전달된 onChange 호출
        className="w-full outline-none px-2"
      />
      <button type="submit" className="ml-2 text-gray-600">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
