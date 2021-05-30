import React from "react";
import {
  GoBackStream,
  StreamContainer,
  StreamInformationContainer,
  CurrentStreamer,
  SkipStream,
  GoToStreamButton,
  NoMoreStreamsContainer,
  FetchMoreStreams,
} from "./styles";

import { IClip, IStream } from "../App";

interface Props {
  streamOffset: number;
  clearData: () => void;
  handleStreamOffset: (offset: "BACK" | "NEXT") => void;
  currentRandomClip: IClip | null;
  stream: IStream;
  fetchMoreStreams: boolean;
  handleFetchMoreStreams: (limit: number) => void;
}

const Stream: React.FunctionComponent<Props> = (props) => {
  const {
    streamOffset,
    clearData,
    handleStreamOffset,
    currentRandomClip,
    stream,
    fetchMoreStreams,
    handleFetchMoreStreams,
  } = props;

  // Fetch more clips component
  if (fetchMoreStreams) {
    return (
      <NoMoreStreamsContainer>
        <GoBackStream
          style={{
            visibility: streamOffset > 0 ? "visible" : "hidden",
            pointerEvents: streamOffset > 0 ? "all" : "none",
          }}
          onClick={() => {
            clearData();
            handleStreamOffset("BACK");
          }}
        >
          Previous Stream
        </GoBackStream>
        <p>No more streams.</p>
        <FetchMoreStreams
          onClick={() => {
            handleFetchMoreStreams(20);
          }}
        >
          Get more streams
        </FetchMoreStreams>
      </NoMoreStreamsContainer>
    );
  }

  return (
    <StreamContainer>
      <GoBackStream
        style={{
          visibility: streamOffset > 0 ? "visible" : "hidden",
          pointerEvents: streamOffset > 0 ? "all" : "none",
        }}
        onClick={() => {
          clearData();
          handleStreamOffset("BACK");
        }}
      >
        Previous Stream
      </GoBackStream>
      <StreamInformationContainer>
        <CurrentStreamer>{currentRandomClip?.broadcaster_name}</CurrentStreamer>
        <GoToStreamButton
          href={stream ? `https://www.twitch.tv/${stream.user_login}` : ""}
          target="_blank"
        >
          Watch Stream
        </GoToStreamButton>
      </StreamInformationContainer>
      <SkipStream
        onClick={() => {
          clearData();
          handleStreamOffset("NEXT");
        }}
      >
        Next Stream
      </SkipStream>
    </StreamContainer>
  );
};

export default Stream;
