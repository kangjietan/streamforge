import React, { useEffect, useState } from "react";
import axios from "axios";

import { IClipsFromStreamsData, IClip, IStream } from "../App";
import {
  Container,
  EmbedClip,
  EmbedClipContainer,
  GoBackClip,
  SkipClip,
  NoClipsContainer,
  ViewOtherClipsButton,
} from "./styles";

import Stream from "../Stream/Stream";

import renderSVG from "../../svgs/renderSVG";

import { shuffleArray } from "../../utils";

const serverUrl = "http://localhost:3000";

interface Props {
  stream: IStream;
  handleStreamOffset: (offset: "BACK" | "NEXT") => void;
  streamOffset: number;
  fetchMoreStreams: boolean;
  handleFetchMoreStreams: (limit: number) => void;
}

const Clip: React.FunctionComponent<Props> = (props) => {
  const {
    stream,
    handleStreamOffset,
    streamOffset,
    fetchMoreStreams,
    handleFetchMoreStreams,
  } = props;

  const [currentRandomClip, setCurrentRandomClip] =
    useState<IClip | null>(null); // Current game streamed related clip
  const [streamClips, setStreamClips] =
    useState<IClipsFromStreamsData | null>(null); // Top clips from stream
  const [filteredClips, setFilteredClips] = useState<IClip[]>([]); // Clips that are currently related to the current streamed game
  const [clipOffset, setClipOffset] = useState(0); // Navigate around clips
  const [noGameClips, setNoGameClips] = useState(false); // If the clips do not pertain to the currently streamed game

  const fetchClipsFromStreams = async (stream?: IStream) => {
    if (stream) {
      const url = `${serverUrl}/twitch/clips?broadcasterID=${stream.user_id}`;
      const responseData: IClipsFromStreamsData = await axios
        .get(url)
        .then((response) => {
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
        setNoGameClips(true);
        setStreamClips(responseData);
        setClipOffset(0);
      } else {
        setNoGameClips(false);
        setClipOffset(0);
        setStreamClips(responseData);
        setFilteredClips(filteredByGameClips);
        setCurrentRandomClip(filteredByGameClips[clipOffset]);
      }
    }
  };

  const clearData = () => {
    setCurrentRandomClip(null);
    setFilteredClips([]);
    setStreamClips(null);
    setNoGameClips(false);
    setClipOffset(0);
  };

  const handleGoBackClick = () => {
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
  };

  const handleSkipClip = () => {
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
  };

  /* If there are clips then show them on click */
  const handleShowDifferentClips = () => {
    if (streamClips && streamClips.data.length > 0) {
      setFilteredClips(streamClips.data);
      setCurrentRandomClip(streamClips.data[0]);
      setNoGameClips(false);
      setClipOffset(0);
    }
  };

  const streamID = stream ? stream.id : 0;

  useEffect(() => {
    // If stream exists
    if (stream) {
      fetchClipsFromStreams(stream);
    }
  }, [streamID]);

  return (
    <Container>
      <Stream
        streamOffset={streamOffset}
        clearData={clearData}
        currentRandomClip={currentRandomClip}
        handleStreamOffset={handleStreamOffset}
        stream={stream}
        fetchMoreStreams={fetchMoreStreams}
        handleFetchMoreStreams={handleFetchMoreStreams}
      />
      {!noGameClips ? (
        <EmbedClipContainer>
          <GoBackClip
            // Render after offset > 0
            style={{
              visibility: clipOffset > 0 ? "visible" : "hidden",
              pointerEvents: clipOffset > 0 ? "all" : "none",
            }}
            onClick={handleGoBackClick}
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
            style={{
              visibility: clipOffset < filteredClips.length - 1 ? "visible" : "hidden",
              pointerEvents: clipOffset < filteredClips.length - 1 ? "all" : "none",
            }}
            onClick={handleSkipClip}
          >
            {renderSVG("chevronCircleRight")}
          </SkipClip>
        </EmbedClipContainer>
      ) : (
        // Streamer is not currently streaming game so don't display
        <NoClipsContainer>
          <p>
            {`${stream?.user_login} has no top clips for ${stream?.game_name}.`}
          </p>
          {streamClips && streamClips.data.length > 0 ? (
            <ViewOtherClipsButton onClick={handleShowDifferentClips}>
              View Other Clips
            </ViewOtherClipsButton>
          ) : null}
        </NoClipsContainer>
      )}
    </Container>
  );
};

export default Clip;
