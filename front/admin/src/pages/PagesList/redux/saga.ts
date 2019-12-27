import { takeLatest, getContext, call, put } from 'redux-saga/effects';
// import { LOGIN_REQUEST } from './constants';
// import { LoginRequstAction, loginFailure, loginSuccess } from './actions';
import { IApiClient, IResponse, IRequestConfig } from '@helpers/api';
import { Error, IPage } from '../types';

import { GET_PAGES_LIST_REQUEST } from './constants';
import { getPagesListFailure, getPagesListSuccess } from './actions';

const getPagesListApiUrl = 'page_list';

export function* handleGetPagesListRequest() {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error>;

  res = yield call(api.makeRequest, {
    url: getPagesListApiUrl,
    method: 'GET',
  } as IRequestConfig);

  console.log(res);
  if (!res.success) {
    yield put(getPagesListFailure(res.data));
    return;
  }
  yield put(getPagesListSuccess(res.data as Array<IPage>));
}

export default function* pagesSaga() {
  yield takeLatest(GET_PAGES_LIST_REQUEST, handleGetPagesListRequest);
}
