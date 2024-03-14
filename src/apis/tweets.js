import { comments, favorites, retweets, tweets } from "../urls";
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

export const fetchTweetsShowComments = (id) => {
  return baseAxiosWithAuthHeaders
    .get(`${tweets}/${id}/${comments}`, {
      id: id,
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

export const deleteTweetsDestroy = (id) => {
  return baseAxiosWithAuthHeaders.delete(`${tweets}/${id}`).then((res) => {
    return res.data.deleted_id;
  });
};

export const retweetTweetsToggle = (id) => {
  return baseAxiosWithAuthHeaders
    .post(`${tweets}/${id}${retweets}`)
    .then((res) => {
      return res.data;
    });
};

export const favoriteTweetsToggle = (id) => {
  return baseAxiosWithAuthHeaders
    .post(`${tweets}/${id}${favorites}`)
    .then((res) => {
      return res.data;
    });
};
