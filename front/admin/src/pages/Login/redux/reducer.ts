import { ActionsTypes } from './actions';
import * as ACTIONS from './constants';
import { ILoginReducer } from '../types';
 
const initialState = {
  isLoading: false
};

function reducer(state: ILoginReducer = initialState, action: ActionsTypes) {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined
      }

    default:
      return state;
  }
}

export default reducer;