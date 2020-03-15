import { takeLatest, getContext, call, put } from 'redux-saga/effects';
import { IApiClient, IResponse, IRequestConfig } from '@helpers/api';
import { IMenu, Error } from '../types';
import {
  getMenusListSuccess,
  AddMenuRequestAction,
  addMenuSuccess,
  ChangeMenuRequestAction,
  changeMenuSuccess,
  getMenusListRequest,
  DeleteMenuRequestAction,
} from './actions';

import { GET_MENUS_LIST_REQUEST, ADD_MENU_REQUEST, CHANGE_MENU_REQUEST, DELETE_MENU_REQUEST } from './constants';
import { navigate } from 'hookrouter';
import { routes } from '@constants/routes';

const apiUrl = 'menus';

export function* handleGetMenusListRequest() {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error>;

  res = yield call(api.makeRequest, {
    url: apiUrl,
    method: 'GET',
  } as IRequestConfig);

  if (res.success) {
    yield put(getMenusListSuccess(res.data as IMenu[]));
  }
}

export function* handleAddMenuRequest({ payload }: AddMenuRequestAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error>;

  res = yield call(api.makeRequest, {
    url: apiUrl,
    method: 'POST',
    body: payload,
  } as IRequestConfig);

  if (res.success) {
    yield put(addMenuSuccess(res.data as IMenu));
  }
}

export function* handleChangeMenuRequest({ payload }: ChangeMenuRequestAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error>;

  res = yield call(api.makeRequest, {
    url: `${apiUrl}`,
    method: 'PATCH',
    body: payload,
  } as IRequestConfig);

  if (res.success) {
    yield put(changeMenuSuccess());
    yield put(getMenusListRequest());
  }
}

export function* handleDeleteMenuRequest({ payload }: DeleteMenuRequestAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error>;

  res = yield call(api.makeRequest, {
    url: `${apiUrl}/${payload}`,
    method: 'DELETE',
  } as IRequestConfig);

  if (res.success) {
    navigate(routes.menus.path);
    yield put(getMenusListRequest());
  }
}

export default function* pagesSaga() {
  yield takeLatest(GET_MENUS_LIST_REQUEST, handleGetMenusListRequest);
  yield takeLatest(ADD_MENU_REQUEST, handleAddMenuRequest);
  yield takeLatest(CHANGE_MENU_REQUEST, handleChangeMenuRequest);
  yield takeLatest(DELETE_MENU_REQUEST, handleDeleteMenuRequest);
}
