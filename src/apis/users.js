import { users } from "../urls";
import { baseAxios } from "./base";

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
    }))
    .catch((e) => ({
      type: usersActionTypes.POST_FAILED,
      errors: e.response.data.errors,
    }));
};
