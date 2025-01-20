import React from "react";
import styled from "styled-components";
import { colors } from "../../common/theme";

const InputFormWrapper = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  background-color: ${colors.gray2};
  border: none;
  border-radius: 10px;

  &::placeholder {
    color: ${colors.gray5};
  }
`;

const InputForm = ({ value, onChange, placeholder }) => {
  return (
    <InputFormWrapper
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputForm;
