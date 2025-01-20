import { useState } from "react";

const useValidation = (validateFn) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
    if (error) setError("");
  };

  const onBlur = () => {
    const validationError = validateFn(value);
    setError(validationError || "");
  };

  const reset = () => {
    setValue("");
    setError("");
  };

  return {
    value,
    error,
    onChange,
    onBlur,
    reset,
  };
};

export default useValidation;
