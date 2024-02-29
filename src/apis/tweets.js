import { tweets } from "../urls";
import { baseAxiosWithAuthHeaders, postingActionTypes } from "./base";

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
