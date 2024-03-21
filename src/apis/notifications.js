import { notifications } from "../urls";
import { baseAxiosWithAuthHeaders, fetchingActionTypes } from "./base";

export const fetchNotificationsIndex = () => {
  return baseAxiosWithAuthHeaders
    .get(notifications)
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
