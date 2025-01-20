import styled from "styled-components";
import SocialLinks from "./SocialLinks";
import FooterLinks from "./FooterLinks";
import FooterMark from "./FooterMark"; // 이름 변경

import { useIsMobile } from "../hooks/useSizes";
const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <StyledFooter isMobile={isMobile}>
      {isMobile ? (
        <>
          <FooterContainer>
            <FooterLinks />
            <SocialLinks />
          </FooterContainer>
          <FooterMark />
        </>
      ) : (
        <>
          <FooterContainer>
            <FooterMark />
            <FooterLinks />
            <SocialLinks />
          </FooterContainer>
        </>
      )}
    </StyledFooter>
  );
};
export default Footer;

// Styled Components 정의
const StyledFooter = styled.footer`
  background-color: #111827;
  text-align: center;
  width: 100%;
  height: 10rem;
  font-size: 1rem;
  font-weight: normal;

  @media (max-width: 1024px) {
    padding: 2rem 0;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  width: 90vw;
  margin: 0 auto;

  @media (max-width: 767px) {
    /* 모바일에서는 세로로 정렬 */
    margin-bottom: 1.5rem;
    gap: 1rem;
    padding: 0 1rem; /* 모바일에서 여백을 좁힘 */
  }
`;
