import React from "react";
import { InputWrapper } from "./InputField.styles";

const InputField = ({
  disabled = false,
  placeholder = "InputField...",
  onChange,
}) => (
  <InputWrapper disabled={disabled} placeholder={placeholder} onChange={onChange} />
);

export default InputField;