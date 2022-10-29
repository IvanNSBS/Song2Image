import styled from "styled-components";
import Image from "next/image";

export const StyledCard = styled.div`
  display: flex;
  align-items: center;
  width: 335px;
  padding: 10px;
  background: #ffffff;
  border: 3px solid #333333;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border: 3px solid gray;
  }
`;

export const CardIcon = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  gap: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardText = styled.span`
  font-family: "Piazzolla";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
