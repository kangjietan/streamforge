import { Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";

import accessEnv from "../../helpers/accessEnv";

export async function getStreams(req: Request, res: Response) {
  const { limit, pagination, cursor } = req.query;

  let url = `https://api.twitch.tv/helix/streams?first=${limit ? limit : 20}`;

  pagination && cursor ? (url += `&${pagination}=${cursor}`) : null;

  const options: AxiosRequestConfig = {
    url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessEnv("APP_ACCESS_TOKEN")}`,
      "Client-ID": accessEnv("TWITCH_CLIENT_ID"),
      Accept: "application/vnd.twitchtv.v5+json",
    },
  };

  return axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getClipsFromUser(req: Request, res: Response) {
  const { broadcasterID } = req.query;

  const url = `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterID}`;

  const options: AxiosRequestConfig = {
    url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessEnv("APP_ACCESS_TOKEN")}`,
      "Client-ID": accessEnv("TWITCH_CLIENT_ID"),
      Accept: "application/vnd.twitchtv.v5+json",
    },
  };

  return axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
