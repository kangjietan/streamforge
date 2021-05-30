import React from "react";
import {
  GoBackStream,
  StreamContainer,
  StreamInformationContainer,
  CurrentStreamer,
  SkipStream,
  GoToStreamButton,
} from "./styles";

import { IClip, IStream } from "../App";

interface Props {
  streamOffset: number;
  clearData: () => void;
  handleStreamOffset: (offset: "BACK" | "NEXT") => void;
  currentRandomClip: IClip | null;
  stream: IStream;
}

const Stream: React.FunctionComponent<Props> = (props) => {
  const {
    streamOffset,
    clearData,
    handleStreamOffset,
    currentRandomClip,
    stream,
  } = props;
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
        Go Back
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
