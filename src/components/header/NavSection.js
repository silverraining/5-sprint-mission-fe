import styled from "styled-components";
import { colors } from "../../common/theme";
const NavSection = () => (
  <Nav>
    <NavLink href="">
      <NavText>자유게시판</NavText>
    </NavLink>
    <NavLink href="">
      <NavText>중고마켓</NavText>
    </NavLink>
  </Nav>
);

export default NavSection;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  color: gray6;
`;

const NavLink = styled.a`
  margin: 0 16px;
  text-decoration: none;
`;

const NavText = styled.h4`
  font-size: 1rem;
  white-space: nowrap;
  color: ${colors.gray6};
  @media (min-width: 640px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.125rem;
  }
`;
