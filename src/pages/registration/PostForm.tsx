import React, { ChangeEvent, FormEvent, useState } from "react";
import { styled } from "styled-components";
import { colors } from "../../assets/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TagHandler from "./TagHandler";
import useValidation from "../../components/hooks/useValidation";
import {
  validateName,
  validateDescription,
  validatePrice,
} from "./PostFormvalidation";
//상품 소개 입력폼 커서를 placeholder의 위치에 뜨게 하는 방법?

interface ProductData {
  name: string;
  description: string;
  price: number | string; // 입력 중에는 string, 제출 시 number
  tags: string[];
}

function PostForm() {
  const url = "https://five-sprint-mission-be-zs3c.onrender.com/products";
  const navigate = useNavigate();
  const [data, setData] = useState<ProductData>({
    //초기 상태 설정
    name: "",
    description: "",
    price: "",
    tags: [],
  });

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault(); //페이지 새로고침 방지
    axios
      .post(url, {
        //입력된 데이터 서버로 전송
        name: data.name,
        description: data.description,
        price: data.price,
        tags: data.tags,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/products/${res.data.id}`);
      })
      .catch((err) => {
        console.error("Error posting data:", err.response?.data || err.message);
      });
  }

  function handle(e: ChangeEvent<HTMLInputElement>): void {
    //입력값 변경 시 호출
    const newdata = { ...data };
    newdata[e.target.id] =
      e.target.id === "price" ? parseFloat(e.target.value) : e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  const InputFieldValidation = ({ validateFn, placeholder }) => {
    const { value, error, onChange, onBlur } = useValidation(validateFn);
  };

  return (
    <>
      {/* 폼태그에 id값 설정 -> index.tsx에서 document.getElementById("post-form")는
     DOM에서 해당 ID를 가진 <form> 요소를 찾고, 이를 참조 */}
      <form id="post-form" onSubmit={submit}>
        <Section>
          <Label>상품명</Label>
          <InputFormWrapper
            onChange={(e) => handle(e)}
            id="name"
            placeholder="상품명을 입력하세요"
            type="text"
          />
        </Section>
        <Section>
          <Label>상품 소개</Label>
          <InputFormWrapper
            onChange={(e) => handle(e)}
            id="description"
            placeholder="상품 소개를 입력하세요"
            type="text"
            isDescription
          />
        </Section>
        <Section>
          <Label>판매가격</Label>
          <InputFormWrapper
            onChange={(e) => handle(e)}
            id="price"
            placeholder="판매가격을 입력하세요"
            type="text"
          />
        </Section>
        <Section>
          <Label>태그</Label>
          <TagHandler
            tags={data.tags}
            setTags={(newTags) =>
              setData((prevData) => ({ ...prevData, tags: newTags }))
            }
          />
        </Section>
      </form>
    </>
  );
}

export default PostForm;

interface InputFormWrapperProps {
  isDescription?: boolean;
}

const ConditionalInput = ({ isDescription, ...props }) => {
  return isDescription ? <textarea {...props} /> : <input {...props} />;
};

const InputFormWrapper = styled(ConditionalInput)<InputFormWrapperProps>`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  background-color: ${colors.gray2};
  border: none;
  border-radius: 10px;
  height: ${({ isDescription }) =>
    isDescription ? "282px" : "30px"}; // For textarea
  display: block;
  &::placeholder {
    color: ${colors.gray5};
  }
  ${({ isDescription }) =>
    isDescription &&
    ` 
      padding-top: 1rem;
      text-align: left;
    `}
`;

const Section = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  white-space: nowrap;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding-top: 10px;
`;
