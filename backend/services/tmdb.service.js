import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
      },
    };

    const res = await axios.get(url, options);

    if (res.status !== 200) {
      throw new Error("Failed to fetch data from TMDB" + res.statusText);
    }
    return res.data;
  } catch (err) {
    console.error("Error in fetchFromTMDB: " + err.message);
  }
};