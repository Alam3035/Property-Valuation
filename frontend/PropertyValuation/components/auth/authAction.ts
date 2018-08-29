import { Dispatch } from "redux";
import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export interface LoginSuccessAction {
  type: LOGIN_SUCCESS;
}

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;
export interface LoginFailureAction {
  type: LOGIN_FAILURE;
  message: string;
}

export const SWITCH_AUTHSTATUS = "SWITCH_AUTHSTATUS";
export type SWITCH_AUTHSTATUS = typeof SWITCH_AUTHSTATUS;
export interface SwitchAuthStatusAction {
  type: SWITCH_AUTHSTATUS;
}

export const LOGOUT = "LOGOUT";
export type LOGOUT = typeof LOGOUT;
export interface LogOutAction {
  type: LOGOUT;
}

export type authAction =
  | LoginSuccessAction
  | LoginFailureAction
  | LogOutAction
  | SwitchAuthStatusAction;

function loginSuccess(): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS
  };
}

function loginFailure(message: string): LoginFailureAction {
  return {
    type: LOGIN_FAILURE,
    message: message
  };
}

function logOutAction(): LogOutAction {
  return {
    type: LOGOUT
  };
}

export function loginUser(username: string, password: string) {
  return (dispatch: Dispatch<authAction>) => {
    return axios
      .post<{ token: string; message?: string }>(
        `${process.env.REACT_APP_API_SERVER}/api/login`,
        {
          username: username,
          password: password
        }
      )
      .then(response => {
        if (response.data == null) {
          dispatch(loginFailure("Unknown Error"));
        } else if (!response.data.token) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginFailure(response.data.message || ""));
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem("token", response.data.token);
          // Dispatch the success action
          dispatch(loginSuccess());
        }
      });
    // .catch(err => console.log('Error: ', err));
  };
}

declare global {
  interface Window {
    FB: {
      logout: (callback: () => void) => void;
    };
  }
}

export function logOut() {
  return (dispatch: Dispatch<authAction>) => {
    window.FB.logout(() => {
      localStorage.removeItem("token");
      // Dispatch the success action
      dispatch(logOutAction());
    });
  };
}
