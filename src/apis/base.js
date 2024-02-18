import axios from "axios";
import { DEFAULT_API_LOCALHOST } from "../urls";

export const baseAxios = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
});
