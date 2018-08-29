import {
  authAction,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SWITCH_AUTHSTATUS
} from "../../components/auth/authAction";

export interface AuthState {
  authStatus: string;
}

const initialState = {
  authStatus: "false"
};

export function authReducer(
  state: AuthState = initialState,
  action: authAction
) {
  console.log("switching........");
  console.log("Sign up. Your auth status is: " + state.authStatus);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        authStatus: "true"
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        authStatus: "false"
      };
    case SWITCH_AUTHSTATUS:
      if (state.authStatus === "false") return { authStatus: "true" };
      else if (state.authStatus === "true") return { authStatus: "false" };
    default:
      return state;
  }
}
