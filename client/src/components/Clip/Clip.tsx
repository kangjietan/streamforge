import React, { useEffect, useState } from "react";
import axios from "axios";

import { IClipsFromStreamsData, IClip, IStream } from "../App";
import {
  Container,
  CurrentStreamer,
  EmbedClip,
  EmbedClipContainer,
  GoBackClip,
  SkipClip,
} from "./styles";

import { shuffleArray } from "../../utils";

const serverUrl = "http://localhost:3000";

interface Props {
  // streamClips: IClipsFromStreamsData;
  stream: IStream;
}

const Clip: React.FunctionComponent<Props> = (props) => {
  const [currentRandomClip, setCurrentRandomClip] = useState<IClip>();
  const [streamClips, setStreamClips] = useState<IClipsFromStreamsData>();

  const fetchClipsFromStreams = async (stream?: IStream) => {
    if (stream) {
      const url = `${serverUrl}/twitch/clips?broadcasterID=${stream.user_id}&gameID=${stream.game_id}`;
      const responseData: IClipsFromStreamsData = await axios.get(url).then((response) => {
        console.log(response);
        return response.data;
      });

      const shuffledClips: IClip[] = shuffleArray(responseData.data);

      setStreamClips(responseData);
      setCurrentRandomClip(shuffledClips[0]);
    }
  };

  useEffect(() => {
    if (props.stream) {
      fetchClipsFromStreams(props.stream);
    }
  }, [props.stream]);

  console.log(props.stream);

  return (
    <Container>
      <CurrentStreamer>{currentRandomClip?.broadcaster_name}</CurrentStreamer>
      <EmbedClipContainer>
        <GoBackClip>Go Back</GoBackClip>
        <EmbedClip
          src={currentRandomClip?.embed_url + "&parent=localhost"}
          allowFullScreen={true}
        ></EmbedClip>
        <SkipClip>Next Clip</SkipClip>
      </EmbedClipContainer>
    </Container>
  );
};

export default Clip;
