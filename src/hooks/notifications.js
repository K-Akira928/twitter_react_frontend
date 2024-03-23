import { useReducer } from "react";
import { useAuthFailedCall } from "./auth";
import { fetchReducer } from "../reducers/requestActionReducer";

export const useNotificationsIndex = (initialState) => {
  const [fetchState, dispatch] = useReducer(fetchReducer, initialState);

  const failedCall = useAuthFailedCall();

  return {
    fetchNotificationsState: fetchState,
    fetchNotificationsDispatch: dispatch,
    callback: {
      success: null,
      authFiled: failedCall,
    },
  };
};
