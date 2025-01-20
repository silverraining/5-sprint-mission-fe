import React from "react";
import styled from "styled-components";
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

const InputFieldValidation = ({ validateFn, placeholder }) => {
  const { value, error, onChange, onBlur } = useValidation(validateFn);

  return (
    <InputFieldWrapper>
      <StyledInput
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        error={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputFieldWrapper>
  );
};

export default InputFieldValidation;
