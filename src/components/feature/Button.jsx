import styled from "styled-components";

import { colors } from "../../common/theme"; // Assuming you have this import for color constants

const Button = styled.button`
  height: 42px;
  padding: 8px 23px;
  font-size: 16px;
  font-weight: Semibold;
  background-color: ${colors.buttonBlue};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;\
  white-space: nowrap;
  width: ${({ width }) => (width ? width : "auto")}; 
  display: flex;
  align-items: center;  
  justify-content: center; 

  // &:hover {
  //   background-color: #3078d1;
  // }
  //     @media (max-width: 743px) {
  //   align-self: center; /* flex 컨테이너 기준 중앙 정렬 */
  // }

  // /* 태블릿 크기 이상에서 버튼 정렬 */
  // @media (min-width: 744px) and (max-width: 1199px) {
  //   align-self: center; /* 버튼 오른쪽 정렬 */
  // }

  // /* 데스크탑 크기 이상에서 버튼 위치 고정 */
  // @media (min-width: 1200px) {
  //   align-self: center;
  // }
`;

export default Button;
