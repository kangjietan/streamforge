import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import GlobalStyles from '../themes/GlobalStyles';

import Gallery from "../components/Gallery/Gallery";
import Clip from "../components/Clip/Clip";

const serverUrl = "http://localhost:3000";

interface IStream {
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
`;

/**
 * Get streams
 * Get random clips from stream
 * Display random clips
 */
const App: React.FunctionComponent = () => {
  const [streams, setStreams] = useState<IStream[]>([]);
  const [streamClips, setStreamClips] = useState<IClipsFromStreamsData[]>([]);
  const [pageCursor, setPageCursor] = useState("");
  const [offset, setOffset] = useState(0);
  // const [currentClip, setCurrentClip] = useState<IClip | null>(null);

  const getStreams = async (
    limit: number,
    offset: string = "",
    cursor: string = ""
  ) => {
    const url = `${serverUrl}/twitch/streams?limit=${limit}`;

    const twitchStreamsData: IGetStreamsData = await axios
      .get(url)
      .then((response) => {
        // console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const { data, pagination } = twitchStreamsData;

    setStreams(data);
    setPageCursor(pagination.cursor);
    fetchClipsFromStreams(data);
  };

  const fetchClipsFromStreams = async (streams?: IStream[]) => {
    if (streams) {
      const clips: IClipsFromStreamsData[] = [];

      for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];
        const url = `${serverUrl}/twitch/clips?broadcasterID=${stream.user_id}&gameID=${stream.game_id}`;
        const data = await axios.get(url).then((response) => {
          console.log(response);
          return response.data;
        });

        clips.push(data);
      }

      console.log("============CLIPS==============");
      console.log(clips);

      setStreamClips(clips);
    }
  };

  useEffect(() => {
    getStreams(20);
  }, []);

  return (
    <Container>
      <GlobalStyles />
      <Clip streamClips={streamClips[offset]} />
      {/* <Gallery clips={streamClips} /> */}
    </Container>
  );
};

export default App;
