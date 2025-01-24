import React from "react";
import { styled } from "styled-components";

const ItemPage: React.FC = () => {
  return (
    <div>
      <ItemPageContainer> 하이 </ItemPageContainer>
    </div>
  );
};
export default ItemPage;

const ItemPageContainer = styled.div`
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
