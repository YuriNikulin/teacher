import { ActionsTypes } from './actions';
import * as ACTIONS from './constants';
import * as APP_ACTIONS from '@store/constants';
import { ActionTypes as AppActionTypes } from '@store/actions';
import { IMenu, IMenuReducer } from '../types';

const initialState = {
  isLoading: true,
  isFormLoading: false,
  menus: [],
};

function reducer(state: IMenuReducer = initialState, action: ActionsTypes | AppActionTypes) {
  switch (action.type) {
    case ACTIONS.GET_MENUS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.GET_MENUS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menus: action.payload,
      };

    case ACTIONS.ADD_MENU_REQUEST:
      return {
        ...state,
        isFormLoading: true,
      };

    case ACTIONS.ADD_MENU_SUCCESS:
      return {
        ...state,
        isFormLoading: false,
        menus: [...state.menus, action.payload],
      };

    case ACTIONS.CHANGE_MENU_REQUEST:
      return {
        ...state,
        isFormLoading: true,
      };

    case ACTIONS.CHANGE_MENU_SUCCESS:
      return {
        ...state,
        isFormLoading: false,
      };

    case ACTIONS.DELETE_MENU_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case APP_ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}

export default reducer;
