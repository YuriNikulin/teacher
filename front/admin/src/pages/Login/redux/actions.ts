import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_TYPE,
  LOGIN_FAILURE,
  LOGIN_FAILURE_TYPE,
  LOGIN_SUCCESS,
  LOGIN_SUCCESS_TYPE,
} from './constants';
import { ILoginState } from '../types';

export interface LoginRequstAction {
  type: LOGIN_REQUEST_TYPE;
  payload: ILoginState;
}

export function loginRequest(payload: ILoginState) {
  return {
    type: LOGIN_REQUEST,
    payload: payload,
  };
}

export interface LoginSuccessAction {
  type: LOGIN_SUCCESS_TYPE;
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export interface LoginFailureAction {
  type: LOGIN_FAILURE_TYPE;
  payload: Partial<ILoginState> | string;
}

export function loginFailure(payload: Partial<ILoginState> | string) {
  return {
    type: LOGIN_FAILURE,
    payload: payload,
  };
}

export type ActionsTypes = LoginRequstAction | LoginFailureAction | LoginSuccessAction;
