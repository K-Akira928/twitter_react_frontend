import { follow, users } from "../urls";
import {
  baseAxios,
  baseAxiosWithAuthHeaders,
  fetchingActionTypes,
  patchActionTypes,
} from "./base";

export const usersActionTypes = {
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
  POST_FAILED: "POST_FAILED",
};

export const postRgistrationCreate = (formData) => {
  const year = formData.get("birthyear");
  const month = formData.get("birthmonth");
  const day = formData.get("birthday");

  const postData = {
    name: formData.get("name"),
    nickname: formData.get("nickname"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
    phone: formData.get("phone"),
    birthday: `${year}-${month}-${day}`,
    confirm_success_url: "http://localhost:3000/letter_opener/",
  };

  return baseAxios
    .post(users, postData)
    .then(() => ({
      type: usersActionTypes.POST_SUCCESS,
      messages: "登録完了、メールを確認してください",
    }))
    .catch((e) => ({
      type: usersActionTypes.POST_FAILED,
      errors: e.response.data.errors,
    }));
};

export const fetchUsersShow = (name, tab) => {
  return baseAxiosWithAuthHeaders
    .get(users + `/${name}`, {
      params: { tab: tab },
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

export const patchUsersUpdate = (name, formData) => {
  return baseAxiosWithAuthHeaders
    .patch(`${users}/${name}`, formData)
    .then((res) => ({
      type: patchActionTypes.PATCH_SUCCESS,
      data: res,
    }))
    .catch((e) => ({
      type: patchActionTypes.PATCH_FAILED,
      errors: e.response.data.errors,
    }));
};

export const postFollowsCreate = (name) => {
  return baseAxiosWithAuthHeaders
    .post(`${users}/${name}${follow}`)
    .catch((e) => {
      return Promise.reject(e);
    });
};
