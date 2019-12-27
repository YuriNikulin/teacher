import { takeLatest, getContext, call, put } from 'redux-saga/effects';
import { ME_REQUEST, LOGOUT_REQUEST } from './constants';
import { MeRequestAction, meFailure, meSuccess, logoutSuccess, logoutFailure } from './actions';
import { IApiClient, IResponse, IRequestConfig } from '@helpers/api';
import { IUser } from '../types';
import Cookies from 'cookies-js';

const meApiUrl = 'me';
const logoutApiUrl = 'logout';

export function* handleMeRequest() {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<IUser>;

  res = yield call(api.makeRequest, {
    url: meApiUrl,
    method: 'GET',
  } as IRequestConfig);

  if (!res.success) {
    yield put(meFailure());
    return;
  }
  if (typeof res.data === 'object') {
    yield put(
      meSuccess({
        login: res.data.login,
        is_admin: res.data.is_admin,
      }),
    );
  }
}

export function* handleLogoutRequest() {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<any>;

  res = yield call(api.makeRequest, {
    url: logoutApiUrl,
    method: 'POST',
  } as IRequestConfig);

  Cookies.expire('auth_token', {
    domain: '/',
  });

  if (res.success) {
    yield put(logoutSuccess());
  } else {
    yield put(logoutFailure());
  }

  return;
}

export default function* authSaga() {
  yield takeLatest(ME_REQUEST, handleMeRequest);
  yield takeLatest(LOGOUT_REQUEST, handleLogoutRequest);
}
