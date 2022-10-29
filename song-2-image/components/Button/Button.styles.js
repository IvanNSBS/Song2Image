import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  opacity: ${props => (props.disabled ? 0.4 : "unset")};
  cursor: ${props => (props.disabled ? "not-allowd" : "pointer")};
  border: none;
  border-radius: 10px;
  align-items: center;
  background-color: #333333;
  padding: 10px 24px;
`;

export const StyledText = styled.span`
font-family: 'Piazzolla';
font-size: 20px;
line-height: 31px;
text-align: center;
color: #FFFFFF;
`;

