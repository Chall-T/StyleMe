import express from "express";

import { getModivoData, fetchModivoFilters } from "../controllers/modivo";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/modivo", getModivoData);
  router.get("/modivoFilters", fetchModivoFilters);
};
