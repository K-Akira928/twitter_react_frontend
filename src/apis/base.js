import axios from "axios";
import { DEFAULT_API_LOCALHOST } from "../urls";
import Cookies from "js-cookie";

export const postingActionTypes = {
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
  POST_FAILED: "POST_FAILED",
};

export const baseAxios = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
});

export const baseAxiosWithAuthHeaders = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
  headers: {
    "access-token": Cookies.get("access-token"),
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
  },
});
