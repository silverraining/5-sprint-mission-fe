import styled from "styled-components";
import Button from "../../feature/Button";
import SearchBar from "../../feature/SearchBar";
import Filter from "../../feature/Filter";
import SortDropdown from "../../feature/SortDropDown";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column; /* 기본적으로 모바일 레이아웃 */
  align-items: center;

  /* Tablet/Desktop */
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  /* Tablet/Desktop */
  @media (min-width: 768px) {
    flex-wrap: nowrap;
    gap: 10px;
  }
`;
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RegisterButton = styled(Button)`
  flex-shrink: 0;
  width: 133px;
  /* Mobile */
  @media (max-width: 767px) {
    margin-right: 46px;
  }
  /* Tablet/Desktop */
  @media (min-width: 768px) {
  }
`;

const DropdownWrapper = styled.div`
  flex-shrink: 0;

  /* Mobile */
  @media (max-width: 767px) {
  }
`;

const TopWrapper = ({
  isMobile,
  searchTerm,
  onSearchChange,
  setDropDownVisible,
  dropDownVisible,
}) => {
  return isMobile ? (
    <>
      <TopContainer>
        <TitleWrapper>
          <Title>판매중인 상품</Title>
          <RegisterButton href="/login.html">상품 등록하기</RegisterButton>
        </TitleWrapper>

        <SearchBarWrapper>
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <Filter
            isMobile={isMobile}
            dropDownVisible={dropDownVisible}
            setDropDownVisible={setDropDownVisible}
          />
          {/* <DropdownWrapper>
              <SortDropdown setSortOrder={(order) => console.log(order)} />
          </DropdownWrapper> */}
        </SearchBarWrapper>
      </TopContainer>
    </>
  ) : (
    <>
      <TopContainer>
        <TitleWrapper>
          <Title>판매중인 상품</Title>
        </TitleWrapper>

        <SearchBarWrapper>
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <RegisterButton href="/login.html">상품 등록하기</RegisterButton>
          <DropdownWrapper>
            <SortDropdown setSortOrder={(order) => console.log(order)} />
          </DropdownWrapper>
        </SearchBarWrapper>
      </TopContainer>
    </>
  );
};
export default TopWrapper;
