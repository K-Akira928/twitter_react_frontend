import { useReducer } from "react";
import { postReducer } from "../reducers/requestActionReducer";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { loginState } from "../store/loginState";

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

export const useAuthFailedCall = () => {
  const setLogin = useSetRecoilState(loginState);

  const failedCall = () => {
    setLogin(false);
  };

  return failedCall;
};
