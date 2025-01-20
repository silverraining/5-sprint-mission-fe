import React, { useState } from "react";
import styled from "styled-components";
import SortDropdown from "./SortDropDown";
import HamburgerIcon from "../../common/images/ic_sort.png";

const Filter = ({ isMobile, dropDownVisible, setDropDownVisible }) => {
  const toggleMenu = () => {
    setDropDownVisible(!dropDownVisible);
  };

  return (
    <FilterContainer>
      {isMobile ? (
        <>
          <HamburgerButton onClick={toggleMenu}>
            <img src={HamburgerIcon} alt="햄버거 메뉴" />
          </HamburgerButton>
          {dropDownVisible && (
            <DropDownMenu>
              <SortDropdown
                setSortOrder={(order) => console.log(order)}
                dropDownVisible={dropDownVisible}
              />
            </DropDownMenu>
          )}
        </>
      ) : (
        <DropDownMenu>
          <SortDropdown setSortOrder={(order) => console.log(order)} />
        </DropDownMenu>
      )}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  position: relative;
`;

const HamburgerButton = styled.button`
  display: block;
  width: 42px;
  height: 42px;
  padding: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const DropDownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
`;

export default Filter;
