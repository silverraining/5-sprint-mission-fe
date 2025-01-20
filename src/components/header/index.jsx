import LogoSection from "./LogoSection";
import NavSection from "./NavSection";
import LoginButton from "./LoginButton";
import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderLeft>
          <LogoSection />
          <NavSection />
        </HeaderLeft>
        <HeaderRight>
          <LoginButton>로그인</LoginButton>
        </HeaderRight>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;

// Styled Components
const StyledHeader = styled.header`
  position: sticky;
  background-color: white;
  top: 8.5px;
  width: 100%;
  border-bottom: 1px solid #dfdfdf;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1920px;
  width: 90%;
  margin: 0 auto;
  padding: 1rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    justify-content: center; /* 모바일에서 중앙 정렬 */
  }

  @
`;
