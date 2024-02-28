import { useReducer } from "react";
import { postReducer } from "../reducers/requestActionReducer";

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
