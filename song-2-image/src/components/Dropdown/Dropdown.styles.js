import styled from "styled-components";
import { StyledConfig } from "react-select";
import Arrow from "./Arrow/Arrow";

export const StyledArrow = styled(Arrow)`
  transform: ${(props) =>
    props.menuIsOpen ? "rotate(-90deg)" : "rotate(90deg"};
  transition: all 0.2;
`;

export const SelectedDisk = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  opacity: ${(props) => (props.chosen ? 1 : 0)};
  transition: all 0.2s;
`;

export const DropdownText = styled.span`
  font-family: "Piazzolla";
  font-size: 20px;
  line-height: 31px;
  text-align: center;
`;
