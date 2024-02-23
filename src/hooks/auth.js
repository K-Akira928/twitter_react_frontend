import { useReducer } from "react";
import { postReducer } from "../reducers/requestActionReducer";
import Cookies from "js-cookie";

export const useAuthCreate = (initialState) => {
  const [postState, dispatch] = useReducer(postReducer, initialState);

  const successCallback = (res) => {
    Cookies.set("access-token", res.headers.accessToken);
    Cookies.set("client", res.headers.client);
    Cookies.set("uid", res.headers.uid);
  };

  return {
    postState: postState,
    dispatch: dispatch,
    callback: {
      success: successCallback,
    },
  };
};
