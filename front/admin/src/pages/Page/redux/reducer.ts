import { ActionsTypes } from './actions';
import * as ACTIONS from './constants';
import { IPageReducer } from '../types';

const initialState = {
  isLoading: true,
  isFormLoading: false,
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

    case ACTIONS.CREATE_PAGE_REQUEST:
      return {
        ...state,
        isFormLoading: true,
      };

    case ACTIONS.CREATE_PAGE_SUCCESS:
      return {
        ...state,
        isFormLoading: false,
        error: undefined,
        pages: [...state.pages, action.payload],
      };

    case ACTIONS.CREATE_PAGE_FAILURE:
      return {
        ...state,
        isFormLoading: false,
        error: action.payload,
      };

    case ACTIONS.DELETE_PAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.DELETE_PAGE_SUCCESS:
      // const removedIndex =
      return {
        ...state,
        isLoading: false,
        pages: [...state.pages.filter(page => page.id !== action.payload)],
      };

    case ACTIONS.DELETE_PAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default reducer;
