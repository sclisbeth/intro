import { Action, ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
// import * as AuthenticationReducer from "./reducers/authentication.reducer";
import * as TodoReducer from './reducers/todo.reducer';
import { Todo } from "../core/models/todo.model";

export interface ApplicationState {
  [TodoReducer.todoFeatureKey]: Todo[],
  'test':any
}

export const AppReducers: ActionReducerMap<ApplicationState> = {
  [TodoReducer.todoFeatureKey]: TodoReducer.todoReducer,
  'test':TodoReducer.todoReducer
};

export function storeMetaReducer(reducer: ActionReducer<any>) {
  return function (state: ApplicationState | undefined, action: Action) {
    if (state === undefined) {
      const persisted = sessionStorage.getItem('state');
      return persisted ? JSON.parse(persisted) : reducer(state, action);
    }
    const stateResult = reducer(state, action);

    sessionStorage.setItem('state', JSON.stringify(stateResult));
    return stateResult;
  };
}

export function clearStateMetaReducer(reducer: ActionReducer<any>) {
  return function (state: ApplicationState | undefined, action: Action) {

    return reducer(state, action);
  };
}

export function loggerMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: ApplicationState | undefined, action: Action) {
    const reducerState = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', reducerState);
    console.groupEnd();
    return reducerState;
  }
}

export const AppMetaReducers: MetaReducer<any>[] = [
  storeMetaReducer,
  clearStateMetaReducer,
  loggerMetaReducer
];
