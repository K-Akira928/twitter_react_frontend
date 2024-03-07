import axios from "axios";
import { DEFAULT_API_LOCALHOST } from "../urls";
import Cookies from "js-cookie";

export const postingActionTypes = {
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
  POST_FAILED: "POST_FAILED",
};

export const fetchingActionTypes = {
  FETCHING: "FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILED: "FETCH_FAILED",
  AUTH_FAILED: "AUTH_FAILED",
};

export const patchActionTypes = {
  PATCHING: "PATCHING",
  PATCH_SUCCESS: "PATCH_SUCCESS",
  PATCH_FAILED: "PATCH_FAILED",
  AUTH_FAILED: "AUTH_FAILED",
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

baseAxiosWithAuthHeaders.interceptors.response.use(
  (res) => {
    return res;
  },
  (e) => {
    if (e.response.status === 401) {
      return Promise.reject({
        isLogin: false,
      });
    } else {
      return Promise.reject(e);
    }
  }
);
