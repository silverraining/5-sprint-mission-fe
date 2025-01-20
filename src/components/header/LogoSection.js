import logoImg from "../../common/images/logo.png";
import styled from "styled-components";

const LogoSection = () => (
  <a href="/">
    <Logo src={logoImg} alt="logo image" />
  </a>
);

export default LogoSection;

const Logo = styled.img`
  width: 112px;
  height: 40px;
  margin-right: 24px;

  @media (min-width: 640px) {
    width: 128px;
    height: 48px;
  }

  @media (min-width: 1024px) {
    width: 152px;
    height: 52px;
  }
`;
