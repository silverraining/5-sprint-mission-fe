import React, { useState } from "react";
import styled from "styled-components";

import { colors } from "../../../common/theme";
import TagHandler from "./TagHandler";
import InputFieldValidation from "./InputFieldValidation";
import axios from "axios";

const URL = "https://five-sprint-mission-be-zs3c.onrender.com/products";

const PageContainer = styled.div`
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

function RegistrationPage() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  // 태그 입력 핸들러
  const handleTagInput = (e) => {
    const value = e.target.value.trim();
    if (value.endsWith(",")) {
      const tag = value.slice(0, -1).trim();
      if (tag) {
        setTags([...tags, tag]);
        setNewTag("");
      }
    } else {
      setNewTag(value);
    }
  };

  // 태그 삭제 핸들러
  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    const productData = {
      name,
      description,
      price,
      tags,
    };

    try {
      const response = await axios.post(URL, productData);
      alert("상품 등록 성공!");
      console.log(response.data); // 성공 응답 처리
    } catch (error) {
      setError("상품 등록 실패! 다시 시도해주세요.");
      console.error("상품 등록 실패:", error);
    }
  };

  return (
    <PageContainer>
      <TitleSection>
        <Title>상품 등록하기</Title>
        <Button onClick={handleSubmit}>등록</Button>
      </TitleSection>

      <Section>
        <Label>상품명</Label>
        <InputFieldValidation
          value={name}
          onChange={(e) => setName(e.target.value)}
          validateFn={validateName}
          placeholder="상품명을 입력하세요"
        />
      </Section>

      <Section>
        <Label>상품 소개</Label>
        <InputFieldValidation
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          validateFn={validateDescription}
          placeholder="상품 소개를 입력하세요"
        />
      </Section>

      <Section>
        <Label>판매가격</Label>
        <InputFieldValidation
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          validateFn={validatePrice}
          placeholder="판매가격을 입력하세요"
        />
      </Section>

      <Section>
        <Label>태그</Label>
        <TagHandler tags={tags} onTagRemove={handleTagRemove} />
      </Section>
    </PageContainer>
  );
}

export default RegistrationPage;

const validateName = (value) => {
  if (!value.trim()) return "상품명을 입력하세요.";
  if (value.length > 10) return "10자 이내로 입력해주세요";
  return "";
};

const validateDescription = (value) => {
  if (!value.trim()) return "상품 소개를 입력해주세요";
  if (value.length < 10) return "10자 이상 입력해주세요";
};

const validatePrice = (value) => {
  if (!value.trim()) return "판매가격을 입력하세요.";
  if (!/^\d+$/.test(value)) return "숫자로 입력해주세요";
  return "";
};
