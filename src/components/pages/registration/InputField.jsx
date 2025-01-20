import React from "react";
import InputForm from "../../feature/InputForm"; // Import the InputForm

const InputField = ({ value, onChange, placeholder }) => {
  return (
    <InputForm value={value} onChange={onChange} placeholder={placeholder} />
  );
};

export default InputField;
