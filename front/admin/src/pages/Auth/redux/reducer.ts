import { ActionsTypes as LoginActionTypes } from '@pages/Login/redux/actions';
import * as LOGIN_ACTIONS from '@pages/Login/redux/constants';
import * as ACTIONS from './constants';
import { IAuthReducer } from '../types';
import { ActionTypes } from './actions';

const initialState = {
  isLoading: true,
  isLogged: false,
};

function reducer(state: IAuthReducer = initialState, action: ActionTypes | LoginActionTypes) {
  switch (action.type) {
    case LOGIN_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: true,
      };

    case ACTIONS.ME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        user: action.payload,
      };

    case ACTIONS.ME_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case ACTIONS.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.LOGOUT_SUCCESS:
    case ACTIONS.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: undefined,
        isLogged: false,
      };

    default:
      return state;
  }
}

export default reducer;
