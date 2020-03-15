import * as ACTIONS from './constants';
import { IMenu } from '../types';

export interface GetMenusListRequestAction {
  type: ACTIONS.GET_MENUS_LIST_REQUEST;
}

export function getMenusListRequest() {
  return {
    type: ACTIONS.GET_MENUS_LIST_REQUEST,
  };
}

export interface GetMenusListSuccessAction {
  type: ACTIONS.GET_MENUS_LIST_SUCCESS;
  payload: IMenu[];
}

export function getMenusListSuccess(payload: GetMenusListSuccessAction['payload']) {
  return {
    type: ACTIONS.GET_MENUS_LIST_SUCCESS,
    payload,
  };
}

export interface AddMenuRequestAction {
  type: ACTIONS.ADD_MENU_REQUEST;
  payload: IMenu;
}

export function addMenuRequest(payload: AddMenuRequestAction['payload']) {
  return {
    type: ACTIONS.ADD_MENU_REQUEST,
    payload,
  };
}

export interface AddMenuSuccessAction {
  type: ACTIONS.ADD_MENU_SUCCESS;
  payload: IMenu;
}

export function addMenuSuccess(payload: AddMenuSuccessAction['payload']) {
  return {
    type: ACTIONS.ADD_MENU_SUCCESS,
    payload,
  };
}

export interface ChangeMenuRequestAction {
  type: ACTIONS.CHANGE_MENU_REQUEST;
  payload: IMenu;
}

export function changeMenuRequest(payload: ChangeMenuRequestAction['payload']) {
  return {
    type: ACTIONS.CHANGE_MENU_REQUEST,
    payload,
  };
}

export interface ChangeMenuSuccessAction {
  type: ACTIONS.CHANGE_MENU_SUCCESS;
}

export function changeMenuSuccess() {
  return {
    type: ACTIONS.CHANGE_MENU_SUCCESS,
  };
}

export interface DeleteMenuRequestAction {
  type: ACTIONS.DELETE_MENU_REQUEST;
  payload: IMenu['id'];
}

export function deleteMenuRequest(payload: DeleteMenuRequestAction['payload']) {
  return {
    type: ACTIONS.DELETE_MENU_REQUEST,
    payload,
  };
}

export interface DeleteMenuSuccessAction {
  type: ACTIONS.DELETE_MENU_SUCCESS;
}

export function deleteMenuSuccess() {
  return {
    type: ACTIONS.DELETE_MENU_SUCCESS,
  };
}

export type ActionsTypes =
  | GetMenusListRequestAction
  | GetMenusListSuccessAction
  | AddMenuRequestAction
  | AddMenuSuccessAction
  | ChangeMenuRequestAction
  | ChangeMenuSuccessAction
  | DeleteMenuRequestAction
  | DeleteMenuRequestAction;
