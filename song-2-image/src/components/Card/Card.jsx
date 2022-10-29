import React from "react";
import { CardIcon, CardText, StyledCard, TextContainer } from "./Card.styled";

const Card = ({
  image = "https://place.dog/100/100",
  song = "Bury the Light",
  artist = "Victor Borba, Casey Edwards",
  album = "Devil May Cry 5 Special Edition",
  handleClick,
}) => (
  <StyledCard onClick={handleClick}>
    <CardIcon width={100} height={100} src={image}/>
    <TextContainer>
      <CardText>{song}</CardText>
      <CardText>{artist}</CardText>
      <CardText>{album}</CardText>
    </TextContainer>
  </StyledCard>
);

export default Card;