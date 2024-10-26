import { Action, createReducer, on } from '@ngrx/store';
import { CounterState, initialState } from './counter.state';
import {
  changeStateName,
  customIncrement,
  decrement,
  increment,
  reset,
} from './counter.actions';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.count,
    };
  }),
  on(changeStateName, (state) => {
    return {
      ...state,
      stateName: 'Completed',
    };
  }),
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action<string>,
) {
  return _counterReducer(state, action);
}
