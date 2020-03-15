import { ActionsTypes } from './actions';
import * as ACTIONS from './constants';
import * as APP_ACTIONS from '@store/constants';
import { ActionTypes as AppActionTypes } from '@store/actions';
import { ISettings, ISettingsReducer } from '../types';

const initialState = {
  isLoading: true,
  settings: null,
};

function reducer(state: ISettingsReducer = initialState, action: ActionsTypes | AppActionTypes) {
  switch (action.type) {
    case ACTIONS.GET_SETTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.GET_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        settings: action.payload,
      };

    case ACTIONS.CHANGE_SETTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.CHANGE_SETTINGS_SUCCESS:
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
