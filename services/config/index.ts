import axios, { AxiosRequestConfig } from "axios";

export async function getAppAccessToken() {
  const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;
  const url = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
  const options: AxiosRequestConfig = {
    method: "POST",
    url,
  };

  const token = await axios(options).then((response) => {
    const { access_token } = response.data;

    return access_token;
  });

  if (process.env.APP_ACCESS_TOKEN === undefined) {
    process.env.APP_ACCESS_TOKEN = token;
  }

  return token;
}
