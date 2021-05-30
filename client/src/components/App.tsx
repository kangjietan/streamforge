import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import GlobalStyles from "../themes/GlobalStyles";

// import Gallery from "../components/Gallery/Gallery";
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
  const [fetchMoreStreams, setFetchMoreStreams] = useState(false);

  /**
   * Fetch streams from Twitch API through proxy.
   * @param limit Number of streams to return. Maximum: 100. Default: 20.
   * @param offset "after" | "before". Tells server to retrieve after or before cursor.
   * @param cursor Pointer on where to retrieve streams.
   * @returns
   */
  const getStreams = async (
    limit: number,
    offset: string = "",
    cursor: string = ""
  ) => {
    let url = `${serverUrl}/twitch/streams?limit=${limit}`;

    url += offset && cursor ? `&pagination=${offset}&cursor=${cursor}` : "";

    const twitchStreamsData: IGetStreamsData = await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return twitchStreamsData;
  };

  /**
   * Increase/decrease stream offset to return the next stream in the array.
   * @param offset "BACK" to decrement and "NEXT" to increment.
   */
  const handleStreamOffset = (offset: "BACK" | "NEXT") => {
    if (offset === "BACK") {
      if (streamOffset >= 0) {
        setStreamOffset(streamOffset - 1);
        setFetchMoreStreams(false);
      }
    }

    if (offset === "NEXT") {
      if (streamOffset < streams.length - 1) {
        setStreamOffset(streamOffset + 1);
        setFetchMoreStreams(false);
      } else {
        setStreamOffset(streamOffset + 1);
        setFetchMoreStreams(true);
      }
    }
  };

  /**
   * Fetch more streams when user hits stream array length. Concat current results and with retrieved results.
   * @param limit Number of streams to return. Maximum: 100. Default: 20.
   */
  const handleFetchMoreStreams = async (limit: number) => {
    if (fetchMoreStreams && pageCursor) {
      const { data, pagination } = await getStreams(limit, "after", pageCursor);

      setStreams([...streams, ...data]);
      setPageCursor(pagination.cursor);
      setFetchMoreStreams(false);
    }
  };

  /**
   * Fetch streams and set state.
   * @param limit Number of streams to return. Maximum: 100. Default: 20.
   */
  const getStreamsOnMount = async (limit: number) => {
    const { data, pagination } = await getStreams(limit);

    setStreams(data);
    setPageCursor(pagination.cursor);
  };

  useEffect(() => {
    getStreamsOnMount(20);
  }, []);

  return (
    <Container>
      <GlobalStyles />
      <Clip
        stream={streams[streamOffset]}
        handleStreamOffset={handleStreamOffset}
        streamOffset={streamOffset}
        fetchMoreStreams={fetchMoreStreams}
        handleFetchMoreStreams={handleFetchMoreStreams}
      />
    </Container>
  );
};

export default App;
