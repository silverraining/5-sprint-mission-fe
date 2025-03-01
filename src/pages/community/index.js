import { useState, useEffect } from "react";
import ArticleList from "@/components/ArticleList.js";
import Select from "@/components/Select";
import SearchBar from "@/components/SearchBar";

const options = [
  { label: "최신순", value: "createdAt" },
  { label: "좋아요순", value: "favorite" },
];

export default function Community({ results, orderBy: initialOrderBy }) {
  const [orderBy, setOrderBy] = useState(initialOrderBy || "createdAt");
  const [sortedResults, setSortedResults] = useState(results);
  const [filteredResults, setFilteredResults] = useState(results);
  const [searchKeyword, setSearchKeyword] = useState("");

  // 정렬 로직 (좋아요순, 최신순)
  useEffect(() => {
    if (!orderBy) return;
    const sorted = [...results].sort((a, b) => {
      if (orderBy === "favorite") return b.favoriteCnt - a.favoriteCnt;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setSortedResults(sorted);
  }, [orderBy, results]);

  // 검색 필터링 (클라이언트에서만 처리)
  useEffect(() => {
    const filtered = searchKeyword
      ? sortedResults.filter((item) =>
          item.title.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      : sortedResults;

    setFilteredResults(filtered);
  }, [searchKeyword, sortedResults]);

  // 정렬 변경 핸들러
  const handleSortChange = (value) => {
    setOrderBy(value);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="flex flex-col items-center w-full gap-8">
      {/* 검색바 & 정렬 버튼 */}
      <div className="w-full max-w-[1200px] flex justify-between items-center">
        <SearchBar value={searchKeyword} onChange={handleSearchChange} />

        <Select
          selected={orderBy}
          onChange={handleSortChange}
          options={options}
        />
      </div>
      {/* 필터링된 결과 전달 */}
      <ArticleList results={filteredResults} />
    </div>
  );
}

export async function getServerSideProps() {
  console.log("✅ getServerSideProps 실행됨");

  const orderBy = "createdAt"; // 초기 정렬 기준

  try {
    const response = await fetch(
      `https://sprint-mission08-be.onrender.com/articles?orderBy=${orderBy}`
    );
    const data = await response.json();

    return {
      props: {
        results: data.list || [],
        orderBy,
      },
    };
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    return {
      props: {
        results: [],
        orderBy,
      },
    };
  }
}
