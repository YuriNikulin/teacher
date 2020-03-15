import * as ACTIONS from './constants';
import { ISettings } from '../types';

export interface GetSettingsRequestAction {
  type: ACTIONS.GET_SETTINGS_REQUEST;
}

export function getSettingsRequest() {
  return {
    type: ACTIONS.GET_SETTINGS_REQUEST,
  };
}

export interface GetSettingsSuccessAction {
  type: ACTIONS.GET_SETTINGS_SUCCESS;
  payload: ISettings;
}

export function getSettingsSuccess(payload: GetSettingsSuccessAction['payload']) {
  return {
    type: ACTIONS.GET_SETTINGS_SUCCESS,
    payload,
  };
}

export interface ChangeSettingsRequestAction {
  type: ACTIONS.CHANGE_SETTINGS_REQUEST;
  payload: ISettings;
}

export function changeSettingsRequest(payload: ChangeSettingsRequestAction['payload']) {
  return {
    type: ACTIONS.CHANGE_SETTINGS_REQUEST,
    payload,
  };
}

export interface ChangeSettingsSuccessAction {
  type: ACTIONS.CHANGE_SETTINGS_SUCCESS;
}

export function changeSettingsSuccess() {
  return {
    type: ACTIONS.CHANGE_SETTINGS_SUCCESS,
  };
}

export type ActionsTypes =
  | GetSettingsRequestAction
  | GetSettingsSuccessAction
  | ChangeSettingsSuccessAction
  | ChangeSettingsRequestAction;
