import Image from "next/image";
import styled from "styled-components";

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 12px;
`;

export const StyledImage = styled(Image)`
  border: ${(props) =>
    props.selectedImage == props.index
      ? "3px solid blue"
      : props.selectedImage == -1
      ? "3px solid #333333"
      : "unset"};
  border-radius: 8px;
  padding: ${(props) =>
    props.selectedImage == props.index || props.selectedImage == -1
      ? "10px"
      : "0px"};
  cursor: pointer;
  transform: ${(props) =>
    props.selectedImage == props.index || props.selectedImage == -1
      ? "scale(1)"
      : "scale(0)"};
  width: ${(props) =>
    props.selectedImage == props.index || props.selectedImage == -1
      ? "100%"
      : "0px"};
  transition: transform 0.2s 0s, width 0s 0s;

  &:hover {
    border: ${(props) =>
      props.selectedImage == props.index ? "3px solid blue" : "3px solid gray"};
    transform: scale(1.2);
    padding: 1px;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 32px;
  margin-top: 32px;
  align-items: center;
`;

export const StropheContainer = styled.p`
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
  white-space: pre-wrap;
  width: 500px;
`;
