import React from "react";
import { useState } from "react";
import ItemList from "./ItemList";

import styled from "styled-components";
import { debounce } from "lodash";
import useItems from "../../hooks/useItems";
import Pagination from "../../feature/Pagination";
import { useIsMobile } from "../../hooks/useSizes";
import TopWrapper from "./TopWrapper";

const ItemPageContainer = styled.div`
  margin-top: 26px;
  margin: 0 auto;
  padding: 0 1.5rem;

  /* Desktop */
  @media (min-width: 1200px) {
    width: 70vw;
    margin: 0 auto;
  }

  /* Tablet */
  @media (min-width: 768px) and (max-width: 1023px) {
    margin: 0 26px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    margin: 0 px;
  }
`;

function ItemPage({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  const {
    data,
    loading,
    error,
    itemsPerPage,
    totalPages,
    setPage,
    setOrderBy,
  } = useItems(searchTerm);

  console.log("Data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <ItemPageContainer>
        <TopWrapper
          isMobile={isMobile}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          dropDownVisible={dropDownVisible}
          setDropDownVisible={setDropDownVisible}
        />
        <div>
          <ItemList data={data} itemsPerPage={itemsPerPage} />
          <Pagination
            totalPages={totalPages} // 페이지 수 계산
            currentPage={currentPage} // 현재 페이지를 전달
            onPageChange={handlePageChange}
          />
        </div>
      </ItemPageContainer>
    </>
  );
}

export default ItemPage;
