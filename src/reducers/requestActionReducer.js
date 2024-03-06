import {
  fetchingActionTypes,
  patchActionTypes,
  postingActionTypes,
} from "../apis/base";

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
        errors: null,
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

export const patchReducer = (state, action) => {
  switch (action.type) {
    case patchActionTypes.PATCHING:
      return {
        ...state,
        status: "LOADING",
        data: [],
      };
    case patchActionTypes.PATCH_SUCCESS:
      action.callback?.success && action.callback.success();
      return {
        ...state,
        status: "OK",
        data: action.payload.data,
        errors: null,
      };
    case patchActionTypes.PATCH_FAILED:
      return {
        ...state,
        status: "NG",
        errors: action.payload,
      };
    case patchActionTypes.AUTH_FAILED:
      action.callback?.authFiled && action.callback.authFiled();
      return {
        ...state,
        status: "AUTH_NG",
        errors: action.payload.errors,
      };
    default:
      throw new Error();
  }
};

export const fetchReducer = (state, action) => {
  switch (action.type) {
    case fetchingActionTypes.FETCHING:
      return {
        ...state,
        status: "LOADING",
        data: [],
      };
    case fetchingActionTypes.FETCH_SUCCESS:
      action.callback?.success && action.callback.success();
      return {
        ...state,
        status: "OK",
        data: action.payload.data,
        errors: null,
      };
    case fetchingActionTypes.FETCH_FAILED:
      return {
        ...state,
        status: "NG",
        errors: action.payload.errors,
      };
    case "AUTH_FAILED":
      action.callback?.authFiled && action.callback.authFiled();
      return {
        ...state,
        status: "AUTH_NG",
        errors: action.payload.errors,
      };
    default:
      throw new Error();
  }
};
