import Cookies from "js-cookie";
import { auth, signIn, users } from "../urls";
import {
  baseAxios,
  baseAxiosWithAuthHeaders,
  postingActionTypes,
} from "./base";

export const postSessionCreate = (formData) => {
  const postData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  return baseAxios
    .post(users + signIn, postData)
    .then((res) => ({
      type: postingActionTypes.POST_SUCCESS,
      headers: {
        accessToken: res.headers["access-token"],
        client: res.headers["client"],
        uid: res.headers["uid"],
      },
    }))
    .catch((e) => ({
      type: postingActionTypes.POST_FAILED,
      errors: e.response.data.errors,
    }));
};

export const getCurrentUser = () => {
  return baseAxiosWithAuthHeaders
    .get(`${auth}/${users}`)
    .then((res) => ({
      status: res.data.status,
      currentUser: res.data.current_user,
    }))
    .catch(() => ({
      status: false,
    }));
};
