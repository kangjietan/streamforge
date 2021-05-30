import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import GlobalStyles from '../themes/GlobalStyles';

import Gallery from "../components/Gallery/Gallery";
import Clip from "../components/Clip/Clip";

const serverUrl = "http://localhost:3000";

export interface IStream {
  id: string;
  user_id: string;
  user_login: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  is_mature: boolean;
}

export interface IClip {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
  duration: number;
}

interface IGetStreamsData {
  data: IStream[];
  pagination: { cursor: string };
}

export interface IClipsFromStreamsData {
  data: IClip[];
  pagination: { cursor: string };
}

// interface IStreamsList {
//   [key: string]: {
//     data: IGetStreamsData;
//     after?: string;
//     before?: string;
//   }
// }

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 144px; */
  /* margin-bottom: 144px; */
`;

/**
 * Get streams
 * Get random clips from stream
 * Display random clips
 */
const App: React.FunctionComponent = () => {
  const [streams, setStreams] = useState<IStream[]>([]);
  const [pageCursor, setPageCursor] = useState("");
  const [streamOffset, setStreamOffset] = useState(0);

  const handleStreamOffset = (offset: "BACK" | "NEXT") => {
    if (offset === "BACK") {
      console.log(streamOffset);
      if (streamOffset >= 0) {
        setStreamOffset(streamOffset - 1);
      }
    } else if (offset === "NEXT") {
      if (streamOffset < streams.length) {
        setStreamOffset(streamOffset + 1);
      }
    }
  }

  const getStreams = async (
    limit: number,
    offset: string = "",
    cursor: string = ""
  ) => {
    const url = `${serverUrl}/twitch/streams?limit=${limit}`;

    const twitchStreamsData: IGetStreamsData = await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const { data, pagination } = twitchStreamsData;

    setStreams(data);
    setPageCursor(pagination.cursor);
  };

  useEffect(() => {
    getStreams(20);
  }, []);

  return (
    <Container>
      <GlobalStyles />
      <Clip stream={streams[streamOffset]} handleStreamOffset={handleStreamOffset} />
      {/* <Gallery clips={streamClips} /> */}
    </Container>
  );
};

export default App;
