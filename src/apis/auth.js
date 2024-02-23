import Cookies from "js-cookie";
import { signIn, users, validateToken } from "../urls";
import { baseAxios, postingActionTypes } from "./base";

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

export const getValidateToken = () => {
  return baseAxios
    .get(users + validateToken, {
      headers: {
        "access-token": Cookies.get("access-token"),
        client: Cookies.get("client"),
        uid: Cookies.get("uid"),
      },
    })
    .then(() => ({
      status: true,
    }))
    .catch(() => ({
      status: false,
    }));
};
