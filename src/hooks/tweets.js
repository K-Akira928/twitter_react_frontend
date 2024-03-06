import { useReducer } from "react";
import { fetchReducer, postReducer } from "../reducers/requestActionReducer";
import { useAuthFailedCall } from "./auth";

export const useTweetCreate = (initialState) => {
  const [postState, dispatch] = useReducer(postReducer, initialState);

  const successCallback = (e) => {
    e.target.reset();
  };

  return {
    postTweetState: postState,
    postTweetDispatch: dispatch,
    callback: {
      success: successCallback,
    },
  };
};

export const useTweetsIndex = (initialState) => {
  const [fetchState, dispatch] = useReducer(fetchReducer, initialState);

  const failedCall = useAuthFailedCall();

  return {
    fetchTweetsState: fetchState,
    fetchTweetsDispatch: dispatch,
    callback: {
      authFiled: failedCall,
    },
  };
};

export const useTweetsShow = (initialState) => {
  const [fetchState, dispatch] = useReducer(fetchReducer, initialState);

  const failedCall = useAuthFailedCall();

  return {
    fetchTweetState: fetchState,
    fetchTweetDispatch: dispatch,
    callback: {
      authFiled: failedCall,
    },
  };
};
