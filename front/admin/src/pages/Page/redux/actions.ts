import {
  GET_PAGES_LIST_REQUEST,
  GET_PAGES_LIST_REQUEST_TYPE,
  GET_PAGES_LIST_FAILURE,
  GET_PAGES_LIST_FAILURE_TYPE,
  GET_PAGES_LIST_SUCCESS,
  GET_PAGES_LIST_SUCCESS_TYPE,
} from './constants';
import { IPage } from '../types';

export interface GetPagesListRequstAction {
  type: GET_PAGES_LIST_REQUEST_TYPE;
}

export function getPagesListRequest() {
  return {
    type: GET_PAGES_LIST_REQUEST,
  };
}

export interface GetPagesListSuccessAction {
  type: GET_PAGES_LIST_SUCCESS_TYPE;
  payload: Array<IPage>;
}

export function getPagesListSuccess(payload: Array<IPage>) {
  return {
    type: GET_PAGES_LIST_SUCCESS,
    payload,
  };
}

export interface GetPagesListFailureAction {
  type: GET_PAGES_LIST_FAILURE_TYPE;
  payload: Partial<IPage> | string;
}

export function getPagesListFailure(payload: Partial<IPage> | string) {
  return {
    type: GET_PAGES_LIST_FAILURE,
    payload: payload,
  };
}

export type ActionsTypes = GetPagesListRequstAction | GetPagesListFailureAction | GetPagesListSuccessAction;
