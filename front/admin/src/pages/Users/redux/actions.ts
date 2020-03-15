import * as ACTIONS from './constants';
import { IUsersReducer } from '../types';
import { IUser } from '@pages/Auth/types';

export interface GetUsersRequestAction {
  type: ACTIONS.GET_USERS_REQUEST_TYPE;
}

export function getUsersRequest() {
  return {
    type: ACTIONS.GET_USERS_REQUEST,
  };
}

export interface GetUsersSuccessAction {
  type: ACTIONS.GET_USERS_SUCCESS_TYPE;
  payload: IUsersReducer['users'];
}

export function getUsersSuccess(users: IUsersReducer['users']) {
  return {
    type: ACTIONS.GET_USERS_SUCCESS,
    payload: users,
  };
}

export interface GetUsersFailureAction {
  type: ACTIONS.GET_USERS_FAILURE_TYPE;
}

export function getUsersFailure() {
  return {
    type: ACTIONS.GET_USERS_FAILURE,
  };
}

export interface ChangeUserRequestAction {
  type: ACTIONS.CHANGE_USER_REQUEST_TYPE;
  payload: {
    newData: IUser;
    login: IUser['login'];
  };
}

export function changeUserRequest(payload: ChangeUserRequestAction['payload']) {
  return {
    type: ACTIONS.CHANGE_USER_REQUEST,
    payload,
  };
}

export interface ChangeUserSuccessAction {
  type: ACTIONS.CHANGE_USER_SUCCESS_TYPE;
  payload: IUser;
}

export function changeUserSuccess(payload: ChangeUserSuccessAction['payload']) {
  return {
    type: ACTIONS.CHANGE_USER_SUCCESS,
    payload,
  };
}

export interface ChangeUserFailureAction {
  type: ACTIONS.CHANGE_USER_FAILURE_TYPE;
  payload: Partial<IUser> | string;
}

export function changeUserFailure(payload: ChangeUserFailureAction['payload']) {
  return {
    type: ACTIONS.CHANGE_USER_FAILURE,
    payload,
  };
}

export interface CreateUserRequestAction {
  type: ACTIONS.CREATE_USER_REQUEST_TYPE;
  payload: IUser;
}

export function createUserRequest(payload: CreateUserRequestAction['payload']) {
  return {
    type: ACTIONS.CREATE_USER_REQUEST,
    payload,
  };
}

export interface CreateUserSuccessAction {
  type: ACTIONS.CREATE_USER_SUCCESS_TYPE;
  payload: Partial<IUser>;
}

export function createUserSuccess(payload: CreateUserSuccessAction['payload']) {
  return {
    type: ACTIONS.CREATE_USER_SUCCESS,
    payload,
  };
}

export interface CreateUserFailureAction {
  type: ACTIONS.CREATE_USER_FAILURE_TYPE;
  payload: Partial<IUser>;
}

export function createUserFailure(payload: Partial<IUser>) {
  return {
    type: ACTIONS.CREATE_USER_FAILURE,
    payload,
  };
}

export interface DeleteUserRequestAction {
  type: ACTIONS.DELETE_USER_REQUEST_TYPE;
  payload: IUser['login'];
}

export function deleteUserRequest(payload: IUser['login']) {
  return {
    type: ACTIONS.DELETE_USER_REQUEST,
    payload,
  };
}

export interface DeleteUserSuccessAction {
  type: ACTIONS.DELETE_USER_SUCCESS_TYPE;
  payload: IUser['login'];
}

export function deleteUserSuccess(payload: IUser['login']) {
  return {
    type: ACTIONS.DELETE_USER_SUCCESS,
    payload,
  };
}

export interface DeleteUserFailureAction {
  type: ACTIONS.DELETE_USER_FAILURE_TYPE;
}

export function deleteUserFailure() {
  return {
    type: ACTIONS.DELETE_USER_FAILURE,
  };
}

export type ActionsTypes =
  | GetUsersRequestAction
  | GetUsersSuccessAction
  | GetUsersFailureAction
  | ChangeUserRequestAction
  | ChangeUserSuccessAction
  | ChangeUserFailureAction
  | CreateUserFailureAction
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction;
