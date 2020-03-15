import { takeLatest, getContext, call, put } from 'redux-saga/effects';
import { IApiClient, IResponse, IRequestConfig } from '@helpers/api';
import { Error, IPage } from '../types';

import {
  GET_PAGES_LIST_REQUEST,
  CREATE_PAGE_REQUEST,
  DELETE_PAGE_REQUEST,
  EDIT_PAGE_REQUEST,
  GET_PAGE_REQUEST,
} from './constants';
import {
  getPagesListFailure,
  getPagesListSuccess,
  createPageSuccess,
  CreatePageRequestAction,
  createPageFailure,
  DeletePageRequestAction,
  deletePageSuccess,
  deletePageFailure,
  EditPageRequestAction,
  editPageFailure,
  editPageSuccess,
  GetPageRequestAction,
} from './actions';
import { navigate } from 'hookrouter';
import { routes } from '@constants/routes';

export const getPagesListApiUrl = 'page_list';
export const onePageActionApiUrl = 'page';
export const changePageLayoutApiUrl = 'page_layout';

export function* handleGetPagesListRequest() {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error>;

  res = yield call(api.makeRequest, {
    url: getPagesListApiUrl,
    method: 'GET',
  } as IRequestConfig);

  if (!res.success) {
    yield put(getPagesListFailure(res.data));
    return;
  }
  yield put(getPagesListSuccess(res.data as Array<IPage>));
}

export function* handleCreatePageRequest({ payload }: CreatePageRequestAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error | IPage>;

  res = yield call(api.makeRequest, {
    url: onePageActionApiUrl,
    method: 'PUT',
    body: payload,
  } as IRequestConfig);

  if (!res.success) {
    yield put(createPageFailure(res.data));
    return;
  }

  yield put(createPageSuccess(res.data as IPage));
}

export function* handleDeletePageRequest({ payload }: DeletePageRequestAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error | IPage['id']>;
  res = yield call(api.makeRequest, {
    url: `${onePageActionApiUrl}/${payload}`,
    method: 'DELETE',
  });

  if (!res.success) {
    yield put(deletePageFailure());
    return;
  }

  navigate(routes.dashboard.path);
  yield put(deletePageSuccess(res.data as IPage['id']));
}

export function* handleEditPageRequest({ payload }: EditPageRequestAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error | IPage>;
  res = yield call(api.makeRequest, {
    url: `${onePageActionApiUrl}/${payload.id}`,
    method: 'PATCH',
    body: payload,
  });

  if (!res.success) {
    yield put(editPageFailure(res.data));
  }

  yield put(editPageSuccess(res.data as IPage));
}

export function* handleGetPagesBlocksRequest({ payload }: GetPageRequestAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<string>;
  res = yield call(api.makeRequest, {
    url: `${onePageActionApiUrl}/${payload}`,
    method: 'GET',
  });
}

export default function* pagesSaga() {
  yield takeLatest(GET_PAGES_LIST_REQUEST, handleGetPagesListRequest);
  yield takeLatest(CREATE_PAGE_REQUEST, handleCreatePageRequest);
  yield takeLatest(DELETE_PAGE_REQUEST, handleDeletePageRequest);
  yield takeLatest(EDIT_PAGE_REQUEST, handleEditPageRequest);
  yield takeLatest(GET_PAGE_REQUEST, handleGetPagesBlocksRequest);
}
