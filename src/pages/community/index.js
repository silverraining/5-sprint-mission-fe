import { useState, useEffect } from "react";
import ArticleList from "@/components/ArticleList";
import Select from "@/components/Select";
import SearchBar from "@/components/SearchBar";
import BestArticleCard from "@/components/BestArticleCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchArticles } from "@/pages/api/articles";
const options = [
  { label: "최신순", value: "createdAt" },
  { label: "좋아요순", value: "favorite" },
];

export default function Community({
  results = [],
  orderBy: initialOrderBy,
  totalPages: initialTotalPages,
}) {
  const [orderBy, setOrderBy] = useState(initialOrderBy || "createdAt");
  const [sortedResults, setSortedResults] = useState(results || []);
  const [filteredResults, setFilteredResults] = useState(results || []);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [bestCount, setBestCount] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  useEffect(() => {
    console.log("✅ 현재 totalPages:", totalPages);
  }, [totalPages]);

  // 🔹 반응형 BestArticle 개수 조절
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBestCount(1);
      } else if (window.innerWidth < 1024) {
        setBestCount(2);
      } else {
        setBestCount(3);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 좋아요 순 상위 게시글
  const bestArticles = [...(sortedResults || [])]
    .sort((a, b) => b.favoriteCnt - a.favoriteCnt)
    .slice(0, bestCount);

  // 정렬 또는 페이지 변경 시 다시 데이터 가져오기
  useEffect(() => {
    const getArticles = async () => {
      try {
        const limit = 10; // 한 페이지당 게시글 개수
        const data = await fetchArticles(orderBy, currentPage, limit);

        setSortedResults(data.list || []);

        // 🔹 totalPages 직접 계산
        const calculatedTotalPages = Math.ceil(data.totalCount / limit);
        console.log("📌 계산된 totalPages:", calculatedTotalPages);

        setTotalPages(calculatedTotalPages || 1);
      } catch (error) {
        console.error("❌ 게시글 불러오기 실패:", error);
      }
    };

    getArticles();
  }, [orderBy, currentPage]);

  // 🔹 검색 필터링
  useEffect(() => {
    const filtered = searchKeyword
      ? sortedResults.filter((item) =>
          item.title?.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      : sortedResults;

    setFilteredResults(filtered || []);
  }, [searchKeyword, sortedResults]);

  // 🔹 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
          <SearchBar value={searchKeyword} onChange={setSearchKeyword} />
          <Select selected={orderBy} onChange={setOrderBy} options={options} />
        </div>

        {/* 필터링된 게시글 목록 */}
        <ArticleList results={filteredResults || []} />

        {/* 페이지네이션 추가 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log("✅ getServerSideProps 실행됨");

  const { query } = context;
  const page = query.page || 1;
  const orderBy = query.orderBy || "createdAt";

  try {
    const response = await fetch(
      `https://sprint-mission08-be.onrender.com/articles?page=${page}&orderBy=${orderBy}`
    );
    const data = await response.json();

    return {
      props: {
        results: data.list || [],
        orderBy,
        totalPages: data.totalPages || 1,
      },
    };
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    return {
      props: {
        results: [],
        orderBy,
        totalPages: 1,
      },
    };
  }
}
