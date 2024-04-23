import express from "express";
import users from "./users";
import authentication from "./authentication";
import outfits from "./generations";
import general from "./general";
import modivo from "./modivo";

export const router = express.Router();

export default (): express.Router => {
  users(router);
  authentication(router);
  outfits(router);
  general(router);
  modivo(router);
  return router;
};
