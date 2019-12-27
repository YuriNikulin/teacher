import { ActionsTypes } from './actions';
import * as ACTIONS from './constants';
import { IPageReducer } from '../types';

const initialState = {
  isLoading: true,
  pages: [],
};

function reducer(state: IPageReducer = initialState, action: ActionsTypes) {
  switch (action.type) {
    case ACTIONS.GET_PAGES_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.GET_PAGES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pages: action.payload,
      };

    case ACTIONS.GET_PAGES_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
