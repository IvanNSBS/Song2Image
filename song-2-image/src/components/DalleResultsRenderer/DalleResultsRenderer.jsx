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
}) => {
  const [selectedImage, setSelectedImage] = useState(-1);

  const handleClick = (index) => {
    if (index == selectedImage) {
      setSelectedImage(-1);
    } else {
      setSelectedImage(index);
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

const mockedData = [
  {
    id: "generation-90HVzHcQ7u9akdoS83Z9xVaQ",
    object: "generation",
    created: 1667142142,
    generation_type: "ImageGeneration",
    generation: {
      image_path:
        "https://openailabsprodscus.blob.core.windows.net/private/user-3WDSburElMKHvQlefMA7xz6u/generations/generation-RsRMw20XYEhPqwxtWr8wnsHq/image.webp?st=2022-10-30T17%3A52%3A39Z&se=2022-10-30T19%3A50%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-30T18%3A49%3A27Z&ske=2022-11-06T18%3A49%3A27Z&sks=b&skv=2021-08-06&sig=NIlKhIvRVDbw1dc8oHynlDeQxuzX9cM4q1NkO%2BOIgn0%3D",
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
        "https://openailabsprodscus.blob.core.windows.net/private/user-3WDSburElMKHvQlefMA7xz6u/generations/generation-EWC5sjT0owkAZp7KGN3FlMiX/image.webp?st=2022-10-30T17%3A52%3A39Z&se=2022-10-30T19%3A50%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-30T18%3A49%3A27Z&ske=2022-11-06T18%3A49%3A27Z&sks=b&skv=2021-08-06&sig=JxLm9AZzBUQEU%2BBHJd2Mfg5CBuwJmbSPJqKZjSDNTSo%3D",
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
        "https://openailabsprodscus.blob.core.windows.net/private/user-3WDSburElMKHvQlefMA7xz6u/generations/generation-9TCqzNB4mgl1GUGOopDow5eh/image.webp?st=2022-10-30T17%3A52%3A39Z&se=2022-10-30T19%3A50%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-30T18%3A49%3A27Z&ske=2022-11-06T18%3A49%3A27Z&sks=b&skv=2021-08-06&sig=zpvzM88203y9mtm0J54vO8g50K/IE5PHHTQo%2BYZ5jug%3D",
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
        "https://openailabsprodscus.blob.core.windows.net/private/user-3WDSburElMKHvQlefMA7xz6u/generations/generation-bdVeA7O0HylMZcnqlzJsdjzi/image.webp?st=2022-10-30T17%3A52%3A39Z&se=2022-10-30T19%3A50%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-30T18%3A49%3A27Z&ske=2022-11-06T18%3A49%3A27Z&sks=b&skv=2021-08-06&sig=09uvVzvvdsOa7TqBeN6xRiAMCNxXKK2aS8WMZXFI9nc%3D",
    },
    task_id: "task-5NnGRQwjePyZUzEEE0OsL8iD",
    prompt_id: "prompt-xsmVMCmyzOUWUTiOxPzVMKoG",
    is_public: false,
  },
];

const mockedStrophe =
  "I am the storm that is approaching\nProvoking black clouds in isolation\nI am reclaimer of my name\nBorn in flames, I have been blessed\nMy family crest is a demon of death\nForsakened, I am awakened\nA phoenix's ash in dark divine\nDescending misery\nDestiny chasing time";
