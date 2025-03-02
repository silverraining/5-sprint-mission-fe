import { useState, useEffect, useMemo } from "react";
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
  allArticles = [],
}) {
  const [orderBy, setOrderBy] = useState(initialOrderBy || "createdAt");
  const [sortedResults, setSortedResults] = useState(results || []);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [bestCount, setBestCount] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [bestArticles, setBestArticles] = useState([]);
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

  // const bestArticles = useMemo(() => {
  //   return [...allArticles] // 전체 게시글 데이터 기준으로 정렬
  //     .sort((a, b) => b.favoriteCnt - a.favoriteCnt)
  //     .slice(0, bestCount);
  // }, [allArticles, bestCount]);

  // Fetch Best Articles from API
  useEffect(() => {
    const fetchBestArticles = async () => {
      try {
        const response = await fetch(
          "https://sprint-mission08-be.onrender.com/articles?orderBy=favorite"
        );
        if (!response.ok) {
          throw new Error("❌ 베스트 게시물 로드 실패");
        }
        const data = await response.json();

        // Access 'list' property and ensure it's an array before sorting
        if (Array.isArray(data.list)) {
          const sortedData = data.list.sort(
            (a, b) => b.favoriteCnt - a.favoriteCnt
          );
          setBestArticles(sortedData.slice(0, bestCount)); // Set top articles
        } else {
          console.error("❌ 'list' 속성이 배열이 아닙니다", data);
        }
      } catch (error) {
        console.error("❌ 베스트 게시물 API 호출 실패:", error);
      }
    };

    fetchBestArticles();
  }, [bestCount]); // Re-run if bestCount changes

  // 🔹 검색 필터링 및 페이지네이션 적용
  const filteredResults = useMemo(() => {
    if (!searchKeyword) return sortedResults; // 검색어 없으면 그대로 반환

    return sortedResults.filter((item) =>
      item.title?.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, sortedResults]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col items-center w-full gap-8 min-w-[343px]">
      {/* ✅ 베스트 게시글 섹션 */}
      <section className="w-full max-w-[1200px] min-w-[343px] md:px-4">
        <h2 className="text-[20px] font-bold mb-4  whitespace-nowrap">
          베스트 게시글
        </h2>
        <BestArticleCard articles={bestArticles} />
      </section>

      {/* ✅ 일반 게시글 섹션 */}
      <section className="w-full max-w-[1200px] min-w-[343px] md:px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-bold whitespace-nowrap">게시글</h2>
          <Link
            href="/community/article/create"
            className="whitespace-nowrap bg-[#3692FF] rounded-lg text-white h-[42px] w-[88px] px-1 font-semibold text-[16px] cursor-pointer flex items-center justify-center"
          >
            글쓰기
          </Link>
        </div>

        {/* 검색바 & 정렬 버튼 */}
        <div className="w-full flex justify-between items-center mb-4 gap-2 min-w-[343px]">
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
    const limit = 10;
    const response = await fetch(
      `https://sprint-mission08-be.onrender.com/articles?page=${page}&orderBy=${orderBy}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("❌ API 요청 실패, 응답 상태가 좋지 않음");
    }

    const data = await response.json();

    return {
      props: {
        results: data.list || [], // 페이지네이션된 게시글
        orderBy,
        totalPages: Math.ceil(data.totalCount / limit) || 1,
        allArticles: data.list || [], // 전체 게시글
      },
    };
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    return {
      props: {
        results: [],
        orderBy,
        totalPages: 1,
        allArticles: [], // 빈 데이터 반환
      },
    };
  }
}
