import { takeLatest, getContext, call, put } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './constants';
import { LoginRequstAction, loginFailure, loginSuccess } from './actions';
import { LOGIN_FORM_NAME } from './constants';
import { IApiClient, IResponse, IRequestConfig } from '@helpers/api';
import { Error } from '../types';
import { change } from 'redux-form';
import { meRequest } from '@pages/Auth/redux/actions';

const loginApiUrl = 'login';

export function* handleLoginRequest({ payload }: LoginRequstAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error>;

  const login = payload.login;
  const password = btoa(payload.password);

  res = yield call(api.makeRequest, {
    url: loginApiUrl,
    method: 'POST',
    body: { login, password },
  } as IRequestConfig);

  if (!res.success) {
    yield put(loginFailure(res.data));

    if (typeof res.data === 'object' && res.data.password) {
      yield put(change(LOGIN_FORM_NAME, 'password', ''));
    }
    return;
  }

  yield put(meRequest());
  yield put(loginSuccess());
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLoginRequest);
}
