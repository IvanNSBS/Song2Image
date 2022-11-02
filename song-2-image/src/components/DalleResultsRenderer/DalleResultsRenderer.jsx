import React, { useState } from "react";
import {
  ImagesContainer,
  ResultsContainer,
  SkeletonContainer,
  StropheContainer,
  StyledImage,
} from "./DalleResultsRenderer.styles";

export const SkeletonLoader = () => (
  <SkeletonContainer
    speed={2}
    backgroundColor="#F3F3F3"
    foregroundColor="#ECEBEB"
    width={1200}
    height={180}
    viewBox="0 0 1200 180"
  >
    <rect height={180} width={180} x={0} y={0} rx={3} ry={3} />
    <rect height={180} width={180} x={192} y={0} rx={3} ry={3} />
    <rect height={180} width={180} x={384} y={0} rx={3} ry={3} />
    <rect height={180} width={180} x={576} y={0} rx={3} ry={3} />

    <rect height={20} width={360} x={780} y={0} rx={3} ry={3} />
    <rect height={20} width={340} x={780} y={40} rx={3} ry={3} />
    <rect height={20} width={280} x={780} y={80} rx={3} ry={3} />
    <rect height={20} width={360} x={780} y={120} rx={3} ry={3} />
    <rect height={20} width={310} x={780} y={160} rx={3} ry={3} />
  </SkeletonContainer>
);

const DalleResultsRenderer = ({
  dalleResults = mockedData,
  strophe = mockedStrophe,
  selectedIndex,
  selectedImageLink,
  setSelectedImageLink
}) => {
  const [selectedImage, setSelectedImage] = useState(-1);

  const handleClick = (index) => {
    if (index == selectedImage) {
      setSelectedImage(-1);
      var arrayClone = [...selectedImageLink];
      arrayClone.splice(selectedIndex,1);
      setSelectedImageLink(arrayClone);
    }else {
      setSelectedImage(index);
      var arrayClone = [...selectedImageLink];
      arrayClone.splice(selectedIndex,0,dalleResults[index].generation.image_path);
      setSelectedImageLink(arrayClone);
    }
  };

  return (
    <ResultsContainer>
        <ImagesContainer>
          {dalleResults.map((result, index) => {
            return (
              <StyledImage
                src={result.generation.image_path}
                key={result.id}
                width={180}
                height={180}
                index={index}
                selectedImage={selectedImage}
                onClick={() => handleClick(index)}
              />
            );
          })}
        </ImagesContainer>
        <StropheContainer>{strophe}</StropheContainer>
      </ResultsContainer>
  );
};

export default DalleResultsRenderer;

export const mockedData = [
  {
    id: "generation-90HVzHcQ7u9akdoS83Z9xVaQ",
    object: "generation",
    created: 1667142142,
    generation_type: "ImageGeneration",
    generation: {
      image_path:
      "https://openailabsprodscus.blob.core.windows.net/private/user-MLlIlQ6dug6zJcjPgf6LgSRp/generations/generation-STRM2y3cU0bXJbDzkYBFptBN/image.webp?st=2022-11-01T23%3A30%3A50Z&se=2022-11-02T01%3A28%3A50Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-01T20%3A44%3A07Z&ske=2022-11-08T20%3A44%3A07Z&sks=b&skv=2021-08-06&sig=C%2BVhWQ%2BpA38ItTjuP97Bl%2BcyQSfFJ57wwU3VSX6Znas%3D"
    },
    task_id: "task-5NnGRQwjePyZUzEEE0OsL8iD",
    prompt_id: "prompt-xsmVMCmyzOUWUTiOxPzVMKoG",
    is_public: false,
  },
  {
    id: "generation-VNYaDDqImKn6UlneUiiWnvlG",
    object: "generation",
    created: 1667142142,
    generation_type: "ImageGeneration",
    generation: {
      image_path:
      "https://openailabsprodscus.blob.core.windows.net/private/user-MLlIlQ6dug6zJcjPgf6LgSRp/generations/generation-STRM2y3cU0bXJbDzkYBFptBN/image.webp?st=2022-11-01T23%3A30%3A50Z&se=2022-11-02T01%3A28%3A50Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-01T20%3A44%3A07Z&ske=2022-11-08T20%3A44%3A07Z&sks=b&skv=2021-08-06&sig=C%2BVhWQ%2BpA38ItTjuP97Bl%2BcyQSfFJ57wwU3VSX6Znas%3D"
    },
    task_id: "task-5NnGRQwjePyZUzEEE0OsL8iD",
    prompt_id: "prompt-xsmVMCmyzOUWUTiOxPzVMKoG",
    is_public: false,
  },
  {
    id: "generation-CEGcwqpevW8YMyikFK5MD5Cw",
    object: "generation",
    created: 1667142142,
    generation_type: "ImageGeneration",
    generation: {
      image_path:
        "https://openailabsprodscus.blob.core.windows.net/private/user-MLlIlQ6dug6zJcjPgf6LgSRp/generations/generation-STRM2y3cU0bXJbDzkYBFptBN/image.webp?st=2022-11-01T23%3A30%3A50Z&se=2022-11-02T01%3A28%3A50Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-01T20%3A44%3A07Z&ske=2022-11-08T20%3A44%3A07Z&sks=b&skv=2021-08-06&sig=C%2BVhWQ%2BpA38ItTjuP97Bl%2BcyQSfFJ57wwU3VSX6Znas%3D"
    },
    task_id: "task-5NnGRQwjePyZUzEEE0OsL8iD",
    prompt_id: "prompt-xsmVMCmyzOUWUTiOxPzVMKoG",
    is_public: false,
  },
  {
    id: "generation-T6PyuI7MMhFAlbfX0o8p3pBX",
    object: "generation",
    created: 1667142142,
    generation_type: "ImageGeneration",
    generation: {
      image_path:
      "https://openailabsprodscus.blob.core.windows.net/private/user-MLlIlQ6dug6zJcjPgf6LgSRp/generations/generation-STRM2y3cU0bXJbDzkYBFptBN/image.webp?st=2022-11-01T23%3A30%3A50Z&se=2022-11-02T01%3A28%3A50Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-01T20%3A44%3A07Z&ske=2022-11-08T20%3A44%3A07Z&sks=b&skv=2021-08-06&sig=C%2BVhWQ%2BpA38ItTjuP97Bl%2BcyQSfFJ57wwU3VSX6Znas%3D"
    },
    task_id: "task-5NnGRQwjePyZUzEEE0OsL8iD",
    prompt_id: "prompt-xsmVMCmyzOUWUTiOxPzVMKoG",
    is_public: false,
  },
];

const mockedStrophe =
  "I am the storm that is approaching\nProvoking black clouds in isolation\nI am reclaimer of my name\nBorn in flames, I have been blessed\nMy family crest is a demon of death\nForsakened, I am awakened\nA phoenix's ash in dark divine\nDescending misery\nDestiny chasing time";
