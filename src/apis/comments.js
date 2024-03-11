import { comments } from "../urls";
import { baseAxiosWithAuthHeaders, postingActionTypes } from "./base";

export const postCommentCreate = (parentTweetId, commentTweetId) => {
  return baseAxiosWithAuthHeaders
    .post(comments, {
      parent_tweet_id: parentTweetId,
      comment_tweet_id: commentTweetId,
    })
    .then((res) => ({
      type: postingActionTypes.POST_SUCCESS,
      data: res,
    }))
    .catch((e) => ({
      type: postingActionTypes.POST_FAILED,
      errors: e,
    }));
};
