import { useEffect, useState } from "react";
import PageItem from "./PageItem";
import "./Pages.css";

/**
 * page : 현재 페이지
 * changePage(p) : 현재 페이지를 p로
 * pageSize : 한 페이지에 보여줄 상품 개수
 * maxPage : 최대 페이지
 */
const Pages = ({ page, changePage, pageSize, maxPage }) => {
  const [prePageSize, setPrePageSize] = useState(1);

  const startPage = 5 * Math.floor((page - 1) / 5) + 1;
  const endPage = Math.min(startPage + 4, maxPage); // 최대 페이지를 초과하지 않도록 조정

  useEffect(() => setPrePageSize(pageSize), []);
  useEffect(() => {
    const p = Math.ceil(((page - 1) * prePageSize + 1) / (pageSize || 1));
    changePage(p);
    setPrePageSize(pageSize);
  }, [pageSize]);

  useEffect(() => {}, [page]);

  return (
    <div className="pages">
      <PageItem
        page={page}
        handleCurrentPage={(p) => (p > 1 ? changePage(p - 1) : null)}
        classNames={"page-item"}
      >
        {"<"}
      </PageItem>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <PageItem
          key={startPage + i}
          page={startPage + i}
          handleCurrentPage={(p) => changePage(p)}
          classNames={`page-item ${page === startPage + i ? "active" : ""}`}
        >
          {startPage + i}
        </PageItem>
      ))}
      <PageItem
        page={page}
        handleCurrentPage={(p) => (p < maxPage ? changePage(p + 1) : null)}
        classNames={"page-item"}
      >
        {">"}
      </PageItem>
    </div>
  );
};

export default Pages;
