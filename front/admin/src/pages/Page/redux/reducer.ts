import { ActionsTypes } from './actions';
import * as ACTIONS from './constants';
import { IPageReducer, IPage } from '../types';

const initialState = {
  isLoading: true,
  isFormLoading: false,
  pages: [],
  drafts: {},
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
        error: undefined,
      };

    case ACTIONS.GET_PAGES_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ACTIONS.CREATE_PAGE_REQUEST:
    case ACTIONS.EDIT_PAGE_REQUEST:
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
    case ACTIONS.EDIT_PAGE_FAILURE:
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
      return {
        ...state,
        isLoading: false,
        error: undefined,
        pages: [...state.pages.filter(page => page.id !== action.payload)],
      };

    case ACTIONS.DELETE_PAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case ACTIONS.EDIT_PAGE_SUCCESS:
      const updatedIndex = state.pages.findIndex((item: IPage) => item.id === action.payload.id);
      if (updatedIndex === -1) {
        return state;
      }
      return {
        ...state,
        isFormLoading: false,
        error: undefined,
        pages: [...state.pages.slice(0, updatedIndex), action.payload, ...state.pages.slice(updatedIndex + 1)],
      };

    case ACTIONS.CHANGE_DRAFT:
      const { newDraft } = action.payload;
      const statesAreDifferent = newDraft.some(block => {
        return block.isDeleted || block.isTouched || (block.isNew && !block.isDeleted);
      });
      return {
        ...state,
        drafts: {
          ...state.drafts,
          [action.payload.pageId]: statesAreDifferent ? action.payload.newDraft : undefined,
        },
      };

    case ACTIONS.DELETE_DRAFT:
      return {
        ...state,
        drafts: {
          ...state.drafts,
          [action.payload]: undefined,
        },
      };

    default:
      return state;
  }
}

export default reducer;
