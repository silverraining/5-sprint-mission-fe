import React from "react";
import { styled } from "styled-components";
import { colors } from "../../assets/theme";
import PostForm from "./PostForm";

const RegistrationPage: React.FC = () => {
  return (
    <PageContainer>
      <TitleSection>
        <Title>상품 등록하기</Title>
        {/* <Button onSubmit={handleSubmit}>등록</Button> */}
      </TitleSection>
      <PostForm />
    </PageContainer>
  );
};
export default RegistrationPage;
const PageContainer = styled.form`
  width: 100%;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 696px;
  }

  @media (max-width: 696px) {
    max-width: 344px;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.gray8};
  margin-bottom: 20px;
`;
const Section = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.p`
  white-space: nowrap;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Button = styled.button`
  height: 42px;
  padding: 8px 23px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${colors.gray5};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #3078d1;
  }
`;

const TagWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 5px 12px;
  background-color: #f1f1f1;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  gap: 8px;
`;
