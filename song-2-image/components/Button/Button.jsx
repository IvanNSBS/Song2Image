import React from "react";
import { StyledButton, StyledText } from "./Button.styles";

const Button = ({
  disabled = false,
  label = null,
  handleClick,
}) => (
  <StyledButton disabled={disabled} onClick={handleClick}>
    <StyledText>{label}</StyledText>
  </StyledButton>
);

export default Button;