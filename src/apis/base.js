import axios from "axios";
import { DEFAULT_API_LOCALHOST } from "../urls";

export const postingActionTypes = {
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
  POST_FAILED: "POST_FAILED",
};

export const baseAxios = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
});
