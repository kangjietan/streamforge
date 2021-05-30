import React, { useEffect, useState } from "react";
import axios from "axios";

import { IClipsFromStreamsData, IClip, IStream } from "../App";
import {
  Container,
  CurrentStreamer,
  EmbedClip,
  EmbedClipContainer,
  GoBackClip,
  GoBackStream,
  GoToStreamButton,
  SkipClip,
  SkipStream,
  StreamContainer,
  StreamInformationContainer,
} from "./styles";

import renderSVG from "../../svgs/renderSVG";

import { shuffleArray } from "../../utils";

const serverUrl = "http://localhost:3000";

interface Props {
  stream: IStream;
  handleStreamOffset: (offset: "BACK" | "NEXT") => void;
}

const Clip: React.FunctionComponent<Props> = (props) => {
  const { stream, handleStreamOffset } = props;

  const [currentRandomClip, setCurrentRandomClip] =
    useState<IClip | null>(null);
  const [streamClips, setStreamClips] = useState<IClipsFromStreamsData>();
  const [filteredClips, setFilteredClips] = useState<IClip[]>([]);
  const [clipOffset, setClipOffset] = useState(0);

  const fetchClipsFromStreams = async (stream?: IStream) => {
    if (stream) {
      const url = `${serverUrl}/twitch/clips?broadcasterID=${stream.user_id}&gameID=${stream.game_id}`;
      const responseData: IClipsFromStreamsData = await axios
        .get(url)
        .then((response) => {
          console.log(response);
          return response.data;
        });

      // Shuffle clips
      const shuffledClips: IClip[] = shuffleArray(responseData.data);
      // Filter clips by what the streamer is currently playing
      const filteredByGameClips = shuffledClips.filter(
        (clip) => clip.game_id === stream.game_id
      );

      // If streamer is playing a game that is not in the top clips
      // Move on to next stream
      if (filteredByGameClips.length === 0) {
        handleStreamOffset("NEXT");
      } else {
        setStreamClips(responseData);
        setCurrentRandomClip(filteredByGameClips[clipOffset]);
        setFilteredClips(filteredByGameClips);
      }
    }
  };

  useEffect(() => {
    // If stream exists
    if (props.stream) {
      fetchClipsFromStreams(props.stream);
    }
  }, [props.stream]);

  return (
    <Container>
      <StreamContainer>
        <GoBackStream
          onClick={() => {
            setCurrentRandomClip(null);
            handleStreamOffset("BACK");
          }}
        >
          Go Back
        </GoBackStream>
        <StreamInformationContainer>
          <CurrentStreamer>
            {currentRandomClip?.broadcaster_name}
          </CurrentStreamer>
          <GoToStreamButton
            href={stream ? `https://www.twitch.tv/${stream.user_login}` : ""}
            target="_blank"
          >
            Watch Stream
          </GoToStreamButton>
        </StreamInformationContainer>
        <SkipStream
          onClick={() => {
            setCurrentRandomClip(null);
            handleStreamOffset("NEXT");
          }}
        >
          Next Stream
        </SkipStream>
      </StreamContainer>
      <EmbedClipContainer>
        <GoBackClip
          // Render after offset > 0
          style={{
            visibility: clipOffset > 0 ? "visible" : "hidden",
            pointerEvents: clipOffset > 0 ? "all" : "none",
          }}
          onClick={() => {
            const nextOffset = clipOffset - 1;

            // Decrease offset if there are clips to be retrieved
            if (nextOffset >= 0) {
              setClipOffset(nextOffset);
            } else {
              return;
            }

            // If there are filtered clips
            if (filteredClips) {
              setCurrentRandomClip(filteredClips[nextOffset]);
            }
          }}
        >
          {renderSVG("chevronCircleLeft")}
        </GoBackClip>
        <EmbedClip
          src={
            currentRandomClip
              ? currentRandomClip.embed_url + "&parent=localhost"
              : ""
          }
          allowFullScreen={true}
        ></EmbedClip>
        <SkipClip
          onClick={() => {
            const nextOffset = clipOffset + 1;
            // Increase offset if there are clips to be retrieved
            if (nextOffset < filteredClips.length) {
              setClipOffset(nextOffset);
            } else {
              return;
            }
            // If there are filtered clips
            if (filteredClips) {
              setCurrentRandomClip(filteredClips[nextOffset]);
            }
          }}
        >
          {renderSVG("chevronCircleRight")}
        </SkipClip>
      </EmbedClipContainer>
    </Container>
  );
};

export default Clip;
