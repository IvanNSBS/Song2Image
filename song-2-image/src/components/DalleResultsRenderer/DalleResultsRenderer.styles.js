import Image from "next/image";
import styled from "styled-components";

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 12px;
`;

export const StyledImage = styled(Image)`
  border: 3px solid #333333;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    border: 3px solid gray;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 32px;

  align-items: center;
`;

export const StropheContainer = styled.p`
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
`;
