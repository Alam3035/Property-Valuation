import { Action, createStore, combineReducers,compose,applyMiddleware } from "redux";
import { authReducer as AuthReducer, IAuthState } from "./reducers/AuthReducer";
import { IPropListState, SearchReducer} from './reducers/SearchReducer'

import thunk from 'react-redux'

export interface IRootState {
  auth: IAuthState;
  property: IPropListState
}

const rootReducer = combineReducers({
  auth: AuthReducer,
  property: SearchReducer
});
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createReduxStore = () => {
  return createStore<IRootState, Action, {}, {}>(rootReducer,
  composeEnhancers(
      applyMiddleware(thunk)
  ));
};
