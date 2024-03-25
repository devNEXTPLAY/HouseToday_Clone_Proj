import { useState } from "react";

export const useInput = (defaultValue) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  const handleInputChange = (event) => {
    setEnteredValue(event.target.value);
  };

  return {
    value: enteredValue,
    handleInputChange,
  };
};

// * 사용법

// const { value, handleInputChange } = useInput("");

// or

// const { value: commentValue, handleInputChange: handleCommentChange } =
// useInput("");
