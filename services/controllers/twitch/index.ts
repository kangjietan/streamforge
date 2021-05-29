import { Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";

export async function getStreams(req: Request, res: Response) {
  const { limit, pagination, cursor } = req.query;

  let url = `https://api.twitch.tv/helix/streams?first=${limit ? limit : 20}`;

  pagination && cursor ? (url += `&=${pagination}=${cursor}`) : null;

  const options: AxiosRequestConfig = {
    url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.APP_ACCESS_TOKEN}`,
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Accept: "application/vnd.twitchtv.v5+json",
    },
  };

  return axios(options)
    .then((response) => {
      console.log(response);
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getClipsFromUser(req: Request, res: Response) {
  const { broadcasterID, gameID } = req.query;

  const url = `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterID}`;

  const options: AxiosRequestConfig = {
    url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.APP_ACCESS_TOKEN}`,
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Accept: "application/vnd.twitchtv.v5+json",
    },
  };

  return axios(options)
    .then((response) => {
      console.log(response);
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
