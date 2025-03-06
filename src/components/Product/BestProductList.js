import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import GetProductApi from "@/services/api/products";

export default function BestProductList() {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const orderBy = "favorite"; // 정렬 기준

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerPage(1); // Mobile
    } else if (width < 1024) {
      setItemsPerPage(2); // Tablet
    } else {
      setItemsPerPage(4); // Desktop
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    // 데이터 가져오기
    const fetchData = async () => {
      const items = await GetProductApi({ orderBy });
      setData(items);
    };
    fetchData();
  }, [orderBy]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const currentItems = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mt-[26px] md:px-6 mb-4">베스트 상품</h1>

      <div className="grid grid-flow-col grid-cols-1 sm:grid-cols-2 md:px-6 lg:grid-cols-4 gap-4 w-full mt-6 mb-[43px]">
        {/* Display items for the current page */}
        {currentItems.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        {/* 페이지네이션 기능 추가하기 */}
      </div>
    </div>
  );
}
