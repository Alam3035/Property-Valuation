import { Dispatch } from "redux";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

// Interface : Login Success
export interface LoginSuccessAction {
  type: LOGIN_SUCCESS;
}

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;

// Interface : Login Failure
export interface LoginFailureAction {
  type: LOGIN_FAILURE;
  message: string;
}

export type authAction = LoginSuccessAction | LoginFailureAction;

function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  };
}

function loginFailure(message: string) {
  return {
    type: LOGIN_FAILURE,
    message: message
  };
}

export function loginAction(username: string, email: string, password: string) {
  console.log("Login...");
  return {
    type: loginAction
  };
}
