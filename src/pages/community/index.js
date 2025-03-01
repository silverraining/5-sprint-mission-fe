import { useState, useEffect } from "react";
import ArticleList from "@/components/ArticleList.js";
import Select from "@/components/Select";
import SearchBar from "@/components/SearchBar";
import BestArticleCard from "@/components/BestArticleCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const options = [
  { label: "최신순", value: "createdAt" },
  { label: "좋아요순", value: "favorite" },
];

export default function Community({ results, orderBy: initialOrderBy }) {
  const [orderBy, setOrderBy] = useState(initialOrderBy || "createdAt");
  const [sortedResults, setSortedResults] = useState(results);
  const [filteredResults, setFilteredResults] = useState(results);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [bestCount, setBestCount] = useState(3); // 반응형 개수 조절

  // 🔹 반응형 BestArticle 개수 조절
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBestCount(1); // 모바일: 1개
      } else if (window.innerWidth < 1024) {
        setBestCount(2); // 태블릿: 2개
      } else {
        setBestCount(3); // 데스크탑: 3개
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 실행
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 좋아요 순 상위 게시글 (반응형 적용)
  const bestArticles = [...sortedResults]
    .sort((a, b) => b.favoriteCnt - a.favoriteCnt)
    .slice(0, bestCount); // bestCount만큼만 가져옴

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
      {/* ✅ 베스트 게시글 섹션 */}
      <section className="w-full max-w-[1200px] px-4">
        <h2 className="text-[20px] font-bold mb-4">베스트 게시글</h2>
        <BestArticleCard articles={bestArticles} />
      </section>

      {/* ✅ 일반 게시글 섹션 */}
      <section className="w-full max-w-[1200px] px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-bold">게시글</h2>
          <Link href="/articles/register">
            <Button className="bg-[#3692FF] text-white h-[42px] w-[88px] px-1 font-semibold text-[16px] cursor-pointer">
              글쓰기
            </Button>
          </Link>
        </div>

        {/* 검색바 & 정렬 버튼 */}
        <div className="w-full flex justify-between items-center mb-4">
          <SearchBar value={searchKeyword} onChange={handleSearchChange} />
          <Select
            selected={orderBy}
            onChange={handleSortChange}
            options={options}
          />
        </div>

        {/* 필터링된 게시글 목록 */}
        <ArticleList results={filteredResults} />
      </section>
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
