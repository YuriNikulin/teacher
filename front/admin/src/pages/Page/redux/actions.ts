import {
  GET_PAGES_LIST_REQUEST,
  GET_PAGES_LIST_REQUEST_TYPE,
  GET_PAGES_LIST_FAILURE,
  GET_PAGES_LIST_FAILURE_TYPE,
  GET_PAGES_LIST_SUCCESS,
  GET_PAGES_LIST_SUCCESS_TYPE,
  CREATE_PAGE_REQUEST,
  CREATE_PAGE_REQUEST_TYPE,
  CREATE_PAGE_FAILURE,
  CREATE_PAGE_FAILURE_TYPE,
  CREATE_PAGE_SUCCESS,
  CREATE_PAGE_SUCCESS_TYPE,
  DELETE_PAGE_FAILURE,
  DELETE_PAGE_FAILURE_TYPE,
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_REQUEST_TYPE,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_SUCCESS_TYPE,
  EDIT_PAGE_FAILURE,
  EDIT_PAGE_FAILURE_TYPE,
  EDIT_PAGE_REQUEST,
  EDIT_PAGE_REQUEST_TYPE,
  EDIT_PAGE_SUCCESS,
  EDIT_PAGE_SUCCESS_TYPE,
  GET_PAGE_REQUEST,
  GET_PAGE_REQUEST_TYPE,
  CHANGE_DRAFT_TYPE,
  CHANGE_DRAFT,
  DELETE_DRAFT_TYPE,
  DELETE_DRAFT,
} from './constants';
import { IPage, ILayout } from '../types';

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

export interface CreatePageRequestAction {
  type: CREATE_PAGE_REQUEST_TYPE;
  payload: IPage;
}

export function createPageRequest(payload: IPage) {
  return {
    type: CREATE_PAGE_REQUEST,
    payload: payload,
  };
}

export interface CreatePageSuccessAction {
  type: CREATE_PAGE_SUCCESS_TYPE;
  payload: IPage;
}

export function createPageSuccess(payload: IPage) {
  return {
    type: CREATE_PAGE_SUCCESS,
    payload: payload,
  };
}

export interface CreatePageFailureAction {
  type: CREATE_PAGE_FAILURE_TYPE;
  payload: Partial<IPage> | string;
}

export function createPageFailure(payload: CreatePageFailureAction['payload']) {
  return {
    type: CREATE_PAGE_FAILURE,
    payload: payload,
  };
}

export interface DeletePageRequestAction {
  type: DELETE_PAGE_REQUEST_TYPE;
  payload: IPage['id'];
}

export function deletePageRequest(payload: DeletePageRequestAction['payload']) {
  return {
    type: DELETE_PAGE_REQUEST,
    payload: payload,
  };
}

export interface DeletePageSuccessAction {
  type: DELETE_PAGE_SUCCESS_TYPE;
  payload: IPage['id'];
}

export function deletePageSuccess(payload: DeletePageSuccessAction['payload']) {
  return {
    type: DELETE_PAGE_SUCCESS,
    payload: payload,
  };
}

export interface DeletePageFailureAction {
  type: DELETE_PAGE_FAILURE_TYPE;
}

export function deletePageFailure() {
  return {
    type: DELETE_PAGE_FAILURE,
  };
}

export interface EditPageRequestAction {
  type: EDIT_PAGE_REQUEST_TYPE;
  payload: IPage;
}

export function editPageRequest(payload: EditPageRequestAction['payload']) {
  return {
    type: EDIT_PAGE_REQUEST,
    payload: payload,
  };
}

export interface EditPageSuccessAction {
  type: EDIT_PAGE_SUCCESS_TYPE;
  payload: IPage;
}

export function editPageSuccess(payload: EditPageSuccessAction['payload']) {
  return {
    type: EDIT_PAGE_SUCCESS,
    payload: payload,
  };
}

export interface EditPageFailureAction {
  type: EDIT_PAGE_FAILURE_TYPE;
  payload: Partial<IPage> | string;
}

export function editPageFailure(payload: EditPageFailureAction['payload']) {
  return {
    type: EDIT_PAGE_FAILURE,
    payload,
  };
}

export interface GetPageRequestAction {
  type: GET_PAGE_REQUEST_TYPE;
  payload: IPage['id'];
}

export function getPageRequest(payload: IPage['id']) {
  return {
    type: GET_PAGE_REQUEST,
    payload,
  };
}

export interface ChangeDraftAction {
  type: CHANGE_DRAFT_TYPE;
  payload: {
    pageId: IPage['id'];
    newDraft: ILayout;
    shouldUpdate?: boolean;
  };
}

export function changeDraft(payload: ChangeDraftAction['payload']) {
  return {
    type: CHANGE_DRAFT,
    payload,
  };
}

export interface DeleteDraftAction {
  type: DELETE_DRAFT_TYPE;
  payload: IPage['id'];
}

export function deleteDraft(payload: DeleteDraftAction['payload']) {
  return {
    type: DELETE_DRAFT,
    payload,
  };
}

export type ActionsTypes =
  | GetPagesListRequstAction
  | GetPagesListFailureAction
  | GetPagesListSuccessAction
  | CreatePageRequestAction
  | CreatePageSuccessAction
  | CreatePageFailureAction
  | DeletePageRequestAction
  | DeletePageSuccessAction
  | DeletePageFailureAction
  | EditPageFailureAction
  | EditPageRequestAction
  | EditPageSuccessAction
  | GetPageRequestAction
  | ChangeDraftAction
  | DeleteDraftAction;
