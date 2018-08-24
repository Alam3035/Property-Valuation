import { IAuthUser } from "../../models/models";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;

export const LOGOUT = "LOGOUT";
export type LOGOUT = typeof LOGOUT;

export interface ILoginSuccessAction {
  type: LOGIN_SUCCESS;
  user: IAuthUser;
}

export interface ILoginFailureAction {
  type: LOGIN_FAILURE;
  user: IAuthUser;
  message: string;
}

export interface ILogOutAction {
  type: LOGOUT;
  user: IAuthUser;
}

// function loginSuccess(user: IAuthUser) {
//   return {
//     user,
//     type: LOGIN_SUCCESS
//   };
// }

// function loginFailure(message: string) {
//   return {
//     type: LOGIN_FAILURE,
//     message: message
//   };
// }

// function logOutAction(user: IAuthUser) {
//   return {
//     user,
//     type: LOGOUT
//   };
// }

export function logInUser(user: IAuthUser): ILoginActions {
  // Login User
  return {
    user,
    type: LOGIN_SUCCESS
  };
}

export function logOutUser(user: IAuthUser): ILoginActions {
  // Logout User
  return {
    user,
    type: LOGOUT
  };
}

export type ILoginActions =
  | ILoginSuccessAction
  | ILoginFailureAction
  | ILogOutAction;
