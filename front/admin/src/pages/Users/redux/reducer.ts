import { ActionsTypes } from './actions';
import * as ACTIONS from './constants';
import * as APP_ACTIONS from '@store/constants';
import { ActionTypes as AppActionTypes } from '@store/actions';
import { IUsersReducer } from '../types';
import { IUser } from '@pages/Auth/types';

const initialState = {
  isLoading: true,
  users: [],
  error: undefined,
  isFormLoading: false,
};

function reducer(state: IUsersReducer = initialState, action: ActionsTypes | AppActionTypes) {
  switch (action.type) {
    case ACTIONS.GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };

    case ACTIONS.GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case ACTIONS.CHANGE_USER_REQUEST:
      return {
        ...state,
        error: undefined,
        isFormLoading: true,
      };

    case ACTIONS.CHANGE_USER_SUCCESS:
      return state;

    case ACTIONS.CHANGE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFormLoading: false,
      };

    case ACTIONS.CREATE_USER_REQUEST:
      return {
        ...state,
        error: undefined,
        isFormLoading: true,
      };

    case ACTIONS.CREATE_USER_SUCCESS:
      return {
        ...state,
        error: undefined,
        isFormLoading: false,
        users: [...state.users, action.payload as IUser],
      };

    case ACTIONS.CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFormLoading: false,
      };

    case ACTIONS.DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users.filter(user => user.login !== action.payload),
      };

    case ACTIONS.DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case APP_ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}

export default reducer;
