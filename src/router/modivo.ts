import express from "express";

import { getModivoData } from "../controllers/modivo";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/modivo", getModivoData);
};
