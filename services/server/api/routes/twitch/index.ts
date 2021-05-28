import express from "express";

import { TwitchControllers } from "../../../../controllers/";

const router = express.Router();

router.get("/streams", TwitchControllers.getStreams);

export default router;
