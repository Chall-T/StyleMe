import express from "express";
import { get, merge } from "lodash";
import { getModivoStoredData } from "../modivo";
import axios from "axios";
import setCookieParser from "set-cookie-parser";
import { wrapper } from "axios-cookiejar-support";
import tough from "tough-cookie";

const MODIVO_COOKIES = process.env.MODIVO_COOKIES;

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
export const fetchModivoFilters = async (req: any, res: express.Response) => {
  try {
    const cookieJar = new tough.CookieJar();
    const cookie = new tough.Cookie({
      key: "_cfuvid",
      value: MODIVO_COOKIES,
      domain: "modivo.pl",
      path: "*/*",
      httpOnly: true,
      secure: true,
    });
    cookieJar.setCookie(cookie, "https://modivo.pl");
    const instance = wrapper(
      axios.create({
        jar: cookieJar, // Attach the cookie jar to Axios
        withCredentials: true, // Enable sending cookies
          headers: {
            "User-Agent": "insomnia/2023.5.8",
          },
      })
    );
    const response = await instance.get(
      "https://modivo.pl/t-api/rest/search/modivo/v5/search_web/filters?channel=modivo&currency=PLN&locale=pl_PL&categories[]=mezczyzni&support_aggregated_size_b=1"
    );
    console.log("Request Details:", response.config);
    console.log("Response Data:", response.data);

    console.log("Response Data:", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json(error);
  }
};
