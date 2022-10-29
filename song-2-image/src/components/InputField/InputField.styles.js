import styled from "styled-components";

export const InputWrapper = styled.input`
  display: flex;
  width: 506px;
  padding: 12px 16px;
  background: #FFFFFF;
  border: 3px solid #333333;
  border-radius: 8px;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  cursor: pointer;
  box-sizing: border-box;
  outline: none;
  font-family: 'Piazzolla';
  font-size: 20px;
  line-height: 31px;
`; 