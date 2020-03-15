import { takeLatest, getContext, call, put } from 'redux-saga/effects';
import { IApiClient, IResponse, IRequestConfig } from '@helpers/api';
import { ISettings } from '../types';
import { getSettingsSuccess, changeSettingsSuccess, ChangeSettingsRequestAction, getSettingsRequest } from './actions';
import { GET_SETTINGS_REQUEST, CHANGE_SETTINGS_REQUEST } from './constants';

export const settingsApiUrl = 'settings';

export function* handleGetSettingsRequest() {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error>;

  res = yield call(api.makeRequest, {
    url: settingsApiUrl,
    method: 'GET',
  } as IRequestConfig);

  if (res.success) {
    yield put(getSettingsSuccess(res.data as ISettings));
  }
}

export function* handleChangeSettingsRequest({ payload }: ChangeSettingsRequestAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error>;

  res = yield call(api.makeRequest, {
    url: settingsApiUrl,
    method: 'PATCH',
    body: payload,
  } as IRequestConfig);

  if (res.success) {
    yield put(changeSettingsSuccess());
    yield put(getSettingsRequest());
  }
}

export default function* pagesSaga() {
  yield takeLatest(GET_SETTINGS_REQUEST, handleGetSettingsRequest);
  yield takeLatest(CHANGE_SETTINGS_REQUEST, handleChangeSettingsRequest);
}
