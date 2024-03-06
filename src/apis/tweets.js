import { tweets } from "../urls";
import {
  baseAxiosWithAuthHeaders,
  fetchingActionTypes,
  postingActionTypes,
} from "./base";

export const postTweetCreate = (formData) => {
  return baseAxiosWithAuthHeaders
    .post(tweets, {
      content: formData.get("content"),
    })
    .then((res) => ({
      type: postingActionTypes.POST_SUCCESS,
      data: res,
    }))
    .catch((e) => ({
      type: postingActionTypes.POST_FAILED,
      errors: e.response.data.errors,
    }));
};

export const fetchTweetsIndex = (page) => {
  return baseAxiosWithAuthHeaders
    .get(tweets, {
      params: {
        page: page,
      },
    })
    .then((res) => ({
      type: fetchingActionTypes.FETCH_SUCCESS,
      data: res.data,
    }))
    .catch((e) => ({
      type: e.isLogin
        ? fetchingActionTypes.FETCH_FAILED
        : fetchingActionTypes.AUTH_FAILED,
      errors: e,
    }));
};

export const fetchTweetsShow = (id) => {
  return baseAxiosWithAuthHeaders
    .get(tweets + `/${id}`, {
      params: {
        id: id,
      },
    })
    .then((res) => ({
      type: fetchingActionTypes.FETCH_SUCCESS,
      data: res.data,
    }))
    .catch((e) => ({
      type: e.isLogin
        ? fetchingActionTypes.FETCH_FAILED
        : fetchingActionTypes.AUTH_FAILED,
      errors: e,
    }));
};
