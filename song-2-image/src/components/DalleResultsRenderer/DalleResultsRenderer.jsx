import Image from "next/image";
import React, { Fragment } from "react";
import {
  ImagesContainer,
  ResultsContainer,
  StropheContainer,
  StyledImage,
} from "./DalleResultsRenderer.styles";

const DalleResultsRenderer = ({
  isLoading = true,
  dalleResults = mockedData,
  strophe = mockedStrophe,
}) => {
  return (
    <>
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <ResultsContainer>
          <ImagesContainer>
            {dalleResults.map((result) => {
              return (
                <StyledImage
                  src={result.generation.image_path}
                  key={result.id}
                  width={180}
                  height={180}
                />
              );
            })}
          </ImagesContainer>
          <StropheContainer>{strophe}</StropheContainer>
        </ResultsContainer>
      )}
    </>
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
        "https://openailabsprodscus.blob.core.windows.net/private/user-3WDSburElMKHvQlefMA7xz6u/generations/generation-90HVzHcQ7u9akdoS83Z9xVaQ/image.webp?st=2022-10-30T14%3A03%3A24Z&se=2022-10-30T16%3A01%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-30T14%3A10%3A08Z&ske=2022-11-06T14%3A10%3A08Z&sks=b&skv=2021-08-06&sig=BQSu%2BRxJ1OhYZNrdja19Y/3m9gyumCNpdgOzVsFgpvo%3D",
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
        "https://openailabsprodscus.blob.core.windows.net/private/user-3WDSburElMKHvQlefMA7xz6u/generations/generation-VNYaDDqImKn6UlneUiiWnvlG/image.webp?st=2022-10-30T14%3A03%3A24Z&se=2022-10-30T16%3A01%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-30T14%3A10%3A08Z&ske=2022-11-06T14%3A10%3A08Z&sks=b&skv=2021-08-06&sig=j/UFu0flmpGw9lgG86cplxgD6lveSHcSb%2BLIAkU%2B1gM%3D",
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
        "https://openailabsprodscus.blob.core.windows.net/private/user-3WDSburElMKHvQlefMA7xz6u/generations/generation-CEGcwqpevW8YMyikFK5MD5Cw/image.webp?st=2022-10-30T14%3A03%3A24Z&se=2022-10-30T16%3A01%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-30T14%3A10%3A08Z&ske=2022-11-06T14%3A10%3A08Z&sks=b&skv=2021-08-06&sig=7zm3R3GH/zmImxFZdT2S%2BBefUhO%2BP8jF8rhPChxOPRw%3D",
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
        "https://openailabsprodscus.blob.core.windows.net/private/user-3WDSburElMKHvQlefMA7xz6u/generations/generation-T6PyuI7MMhFAlbfX0o8p3pBX/image.webp?st=2022-10-30T14%3A03%3A24Z&se=2022-10-30T16%3A01%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-30T14%3A10%3A08Z&ske=2022-11-06T14%3A10%3A08Z&sks=b&skv=2021-08-06&sig=htSqkAKjoelIlqr1ixStJVEsI2gzyWbq8K7ajwnvf%2BE%3D",
    },
    task_id: "task-5NnGRQwjePyZUzEEE0OsL8iD",
    prompt_id: "prompt-xsmVMCmyzOUWUTiOxPzVMKoG",
    is_public: false,
  },
];

const mockedStrophe =
  "I am the storm that is approaching\nProvoking black clouds in isolation\nI am reclaimer of my name\nBorn in flames, I have been blessed\nMy family crest is a demon of death\nForsakened, I am awakened\nA phoenix's ash in dark divine\nDescending misery\nDestiny chasing time";
