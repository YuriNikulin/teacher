import * as constants from './constants';
import { IUser } from '../types';

export interface MeRequestAction {
  type: constants.ME_REQUEST_TYPE;
}

export function meRequest() {
  return {
    type: constants.ME_REQUEST,
  };
}

export interface MeSuccessAction {
  type: constants.ME_SUCCESS_TYPE;
  payload: IUser;
}

export function meSuccess(payload: IUser) {
  return {
    type: constants.ME_SUCCESS,
    payload,
  };
}

export interface MeFailureAction {
  type: constants.ME_FAILURE_TYPE;
}

export function meFailure() {
  return {
    type: constants.ME_FAILURE,
  };
}

export interface LogoutRequestAction {
  type: constants.LOGOUT_REQUEST_TYPE;
}

export function logoutRequest() {
  return {
    type: constants.LOGOUT_REQUEST,
  };
}

export interface LogoutSuccessAction {
  type: constants.LOGOUT_SUCCESS_TYPE;
}

export function logoutSuccess() {
  return {
    type: constants.LOGOUT_SUCCESS,
  };
}

export interface LogoutFailureAction {
  type: constants.LOGOUT_FAILURE_TYPE;
}

export function logoutFailure() {
  return {
    type: constants.LOGOUT_FAILURE,
  };
}

export type ActionTypes =
  | MeRequestAction
  | MeSuccessAction
  | MeFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction;
