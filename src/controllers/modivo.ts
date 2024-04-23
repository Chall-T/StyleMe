import express from "express";
import { get, merge } from "lodash";
import { getModivoStoredData } from "../modivo";

export const getModivoData = async (req: any, res: express.Response) => {
  try {
    const modivoData = getModivoStoredData();
    if (!modivoData) {
      return res.sendStatus(500);
    }
    return res.status(200).json(modivoData);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};