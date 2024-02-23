import { postingActionTypes } from "../apis/base";

export const postReducer = (state, action) => {
  switch (action.type) {
    case postingActionTypes.POSTING:
      return {
        ...state,
        status: "LOADING",
        data: [],
      };
    case postingActionTypes.POST_SUCCESS:
      action.callback?.success && action.callback.success();
      return {
        ...state,
        status: "OK",
        data: action.payload,
      };
    case postingActionTypes.POST_FAILED:
      action.callback?.failed && action.callback.failed();
      return {
        ...state,
        status: "NG",
        errors: action.payload.errors,
      };
    default:
      throw new Error();
  }
};
