import React, { useState } from "react";
import styled from "styled-components";
import Ximg from "../../../common/images/ic_X.png";
import { colors } from "../../../common/theme";
import useValidation from "./useValidation";

const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  background-color: ${colors.gray2};
  border: 2px solid ${(props) => (props.error ? "red" : "transparent")};
  border-radius: 10px;

  &::placeholder {
    color: ${colors.gray5};
  }

  &:focus {
    border-color: ${(props) => (props.error ? "red" : colors.gray5)};
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const TagWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 6px 12px;
  background-color: ${colors.gray2};
  border-radius: 20px;
  font-size: 16px;
  color: ${colors.gray8};
  border: none;
  display: flex;
  align-items: center;
`;

const RemoveIcon = styled.span`
  margin-left: 8px;
  color: red;
  cursor: pointer;
`;
const validateTag = (value) => {
  if (!value.trim()) return "태그를 입력하세요.";
  if (value.length > 5) return "5글자 이내로 입력해주세요";
  return "";
};

function TagHandler() {
  const [tags, setTags] = useState([]);
  const { value, error, onChange, onBlur, reset } = useValidation(validateTag);

  const addTag = () => {
    if (!error && value.trim() && !tags.includes(value)) {
      setTags((prevTags) => [...prevTags, value.trim()]);
      reset(); // 입력 필드 초기화
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <InputFieldWrapper>
        <StyledInput
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // 기본 동작 방지
              addTag();
            }
          }}
          placeholder="태그를 입력하세요"
          error={!!error}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputFieldWrapper>
      <TagWrapper>
        {tags.map((tag, index) => (
          <Tag key={index}>
            #{tag}
            <RemoveIcon onClick={() => removeTag(tag)}>
              <img src={Ximg} alt="삭제" />
            </RemoveIcon>
          </Tag>
        ))}
      </TagWrapper>
    </div>
  );
}

export default TagHandler;
