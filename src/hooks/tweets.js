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
      success: null,
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
      success: null,
      authFiled: failedCall,
    },
  };
};

export const useTweetCommentsIndex = (initialState) => {
  const [fetchState, dispatch] = useReducer(fetchReducer, initialState);

  const failedCall = useAuthFailedCall();

  return {
    fetchTweetCommentsState: fetchState,
    fetchTweetCommentsDispatch: dispatch,
    fetchTweetCommentsCallback: {
      success: null,
      authFiled: failedCall,
    },
  };
};

export const useTweetAction = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "set": {
        return action.data;
      }
      case "delete": {
        const newState = [...state].filter(
          (tweet) => tweet.id !== Number(action.id)
        );
        return newState;
      }
      case "toggleRetweet": {
        const newState = [...state];
        const target = newState.find((tweet) => tweet.id === action.id);
        const targetIndex = state.findIndex((tweet) => tweet === target);

        target.action.retweet.retweeted =
          action.status === "created" ? true : false;
        target.action.retweet.count =
          action.status === "created" ? action.count++ : action.count--;

        newState.splice(targetIndex, 1, target);
        return newState;
      }
      default:
        throw new Error();
    }
  };
  const [tweets, tweetsDispatch] = useReducer(reducer, []);

  return [tweets, tweetsDispatch];
};
