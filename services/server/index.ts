import dotenv from "dotenv";
dotenv.config();

import { getAppAccessToken } from "../config/";
getAppAccessToken();

import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";

import twitchRouter from "./api/routes/twitch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "../../client/public")));

app.use("/twitch", twitchRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => console.log("Listening on port: " + PORT));
