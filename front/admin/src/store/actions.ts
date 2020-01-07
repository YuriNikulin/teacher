import * as ACTIONS from './constants';

export interface Reset {
  type: ACTIONS.RESET_TYPE;
}

export function reset() {
  return {
    type: ACTIONS.RESET,
  };
}

export type ActionTypes = Reset;
