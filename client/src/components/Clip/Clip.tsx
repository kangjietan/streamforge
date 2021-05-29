import React, { useEffect, useState } from "react";

import { IClipsFromStreamsData, IClip } from "../App";
import { Container, EmbedClip, EmbedClipContainer } from "./styles";

interface Props {
  streamClips: IClipsFromStreamsData;
}

const Clip: React.FunctionComponent<Props> = (props) => {
  const [currentRandomClip, setCurrentRandomClip] = useState<IClip>();

  useEffect(() => {
    if (props.streamClips) {
      setCurrentRandomClip(props.streamClips.data[0]);
    }
  }, [props.streamClips]);

  return (
    <Container>
      <EmbedClipContainer>
        <EmbedClip
          src={currentRandomClip?.embed_url + "&parent=localhost"}
          allowFullScreen={true}
        ></EmbedClip>
      </EmbedClipContainer>
    </Container>
  );
};

export default Clip;
