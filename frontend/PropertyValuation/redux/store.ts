import { Action, createStore, combineReducers } from "redux";
import { authReducer as AuthReducer, IAuthState } from "./reducers/AuthReducer";

export interface IRootState {
  auth: IAuthState;
}

const rootReducer = combineReducers({
  auth: AuthReducer
});

export const createReduxStore = () => {
  return createStore<IRootState, Action, {}, {}>(rootReducer);
};
