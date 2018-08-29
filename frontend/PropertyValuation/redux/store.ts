import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer as AuthReducer, AuthState } from "./reducers/AuthReducer";
import thunk from "redux-thunk";
import { GenericStoreEnhancer } from "redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (
      enhancer: GenericStoreEnhancer
    ) => GenericStoreEnhancer;
  }
}

export interface IRootState {
  auth: AuthState;
}

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    auth: AuthReducer
  })
  // composeEnhancers(applyMiddleware(thunk))
);
