import Image from "next/image";
const SearchBar = ({ value, onChange }) => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()} // 새로고침 방지
      className="relative flex items-center w-full bg-[#F3F4F6] rounded-[10px] p-2  min-w-[288px] max-w-[1054px] flex-grow"
    >
      <Image
        src="/ic_search.png"
        width={24}
        height={24}
        className="absolute left-3 top-2"
        alt="search"
      />
      <input
        type="text"
        placeholder=" 검색할 상품을 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)} // 부모에서 전달된 onChange 호출
        className="w-full outline-none px-2 pl-8"
      />
    </form>
  );
};

export default SearchBar;
