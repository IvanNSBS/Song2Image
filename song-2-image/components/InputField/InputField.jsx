import React from "react";
import { InputWrapper } from "./InputField.styles";

const InputField = ({
  disabled = false,
  placeholder = "InputField..."
}) => (
  <InputWrapper disabled={disabled} placeholder={placeholder} />
);

export default InputField;