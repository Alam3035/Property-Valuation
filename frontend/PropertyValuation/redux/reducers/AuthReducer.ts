import {
  authAction,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../../components/auth/authAction";

export interface AuthState {
  auth: string;
}

const initialState = {
  auth: "Press me the print greet messgae ~ :D"
};

export function authReducer(
  state: AuthState = initialState,
  action: authAction
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        auth: "new hello world"
      };
    case LOGIN_FAILURE:
      return {
        auth: "new hello world"
      };
    default:
      return state;
  }
}
