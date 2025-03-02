const SearchBar = ({ value, onChange }) => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()} // 새로고침 방지
      className="flex items-center w-full max-w-[400px] bg-[#F3F4F6] rounded-[10px] p-2"
    >
      <input
        type="text"
        placeholder="🔍 검색할 상품을 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)} // 부모에서 전달된 onChange 호출
        className="w-full outline-none px-2"
      />
    </form>
  );
};

export default SearchBar;
