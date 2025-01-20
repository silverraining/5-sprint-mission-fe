import styled from "styled-components";

const FooterMark = () => {
  return (
    <MarkWrapper>
      <p>©codeit - 2025</p>
    </MarkWrapper>
  );
};

export default FooterMark;

const MarkWrapper = styled.div`
  /* 변경된 이름 */
  color: #9ca3af;
  display: flex;
  justify-content: start;
  padding-left: 2rem;
  @media (min-width: 768px) {
    justify-content: center;
  }
`;
