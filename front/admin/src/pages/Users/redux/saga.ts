import { takeLatest, getContext, call, put } from 'redux-saga/effects';
import { IApiClient, IResponse, IRequestConfig } from '@helpers/api';
import {
  getUsersSuccess,
  getUsersFailure,
  ChangeUserRequestAction,
  changeUserFailure,
  CreateUserRequestAction,
  createUserFailure,
  createUserSuccess,
  DeleteUserRequestAction,
  deleteUserFailure,
  deleteUserSuccess,
  changeUserSuccess,
  getUsersRequest,
} from './actions';
import * as ACTIONS from './constants';
import { IUser } from '@pages/Auth/types';
import { IUsersReducer } from '../types';
import { Error } from '../types';
import store from '@store/store';
import { meRequest } from '@pages/Auth/redux/actions';
import { navigate } from 'hookrouter';
import { routes } from '@constants/routes';
import { change, untouch } from 'redux-form';
import { USER_FORM_NAME } from './constants';

export const usersListApiUrl = 'users';
export const registerApiUrl = 'register';

function* handleGetUsersRequest() {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error | IUsersReducer['users']>;

  res = yield call(api.makeRequest, {
    url: usersListApiUrl,
    method: 'GET',
  } as IRequestConfig);

  if (!res.success) {
    yield put(getUsersFailure());
    return;
  }

  yield put(getUsersSuccess(res.data as Array<IUser>));
}

function* handleChangeUserRequest({ payload: { login, newData } }: ChangeUserRequestAction) {
  const state = store.getState();
  const currentLogin = state.auth.user?.login;
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error | IUser>;

  res = yield call(api.makeRequest, {
    url: `${usersListApiUrl}/${login}`,
    body: {
      ...newData,
      currentPassword: newData.currentPassword && btoa(newData.currentPassword),
      newPassword: newData.newPassword && btoa(newData.newPassword),
    },
    method: 'PATCH',
  } as IRequestConfig);

  if (!res.success) {
    yield put(changeUserFailure(res.data));
    return;
  }

  if (currentLogin === login) {
    yield put(meRequest());
  }

  yield put(change(USER_FORM_NAME, 'currentPassword', ''));
  yield put(change(USER_FORM_NAME, 'newPassword', ''));
  yield put(untouch(USER_FORM_NAME, 'currentPassword'));
  yield put(changeUserSuccess(res.data as IUser));
  yield put(getUsersRequest());
  navigate(routes.user.getPath(newData.login));
}

function* handleCreateUserRequest({ payload: { login, newPassword } }: CreateUserRequestAction) {
  if (!newPassword) {
    return;
  }
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error | IUser>;

  res = yield call(api.makeRequest, {
    url: registerApiUrl,
    method: 'POST',
    body: { password: btoa(newPassword), login },
  } as IRequestConfig);

  if (!res.success && typeof res.data === 'object') {
    yield put(createUserFailure(res.data));
    return;
  }

  if (typeof res.data === 'object' && res.data.login) {
    yield put(createUserSuccess(res.data));
  }
  return;
}

function* handleDeleteUserRequest({ payload }: DeleteUserRequestAction) {
  const api: IApiClient = yield getContext('api');
  let res: IResponse<Error | string>;

  res = yield call(api.makeRequest, {
    url: `${usersListApiUrl}/${payload}`,
    method: 'DELETE',
  } as IRequestConfig);

  if (!res.success) {
    yield put(deleteUserFailure());
    return;
  }

  yield put(deleteUserSuccess(res.data as string));
}

export default function* usersSaga() {
  yield takeLatest(ACTIONS.GET_USERS_REQUEST, handleGetUsersRequest);
  yield takeLatest(ACTIONS.CHANGE_USER_REQUEST, handleChangeUserRequest);
  yield takeLatest(ACTIONS.CREATE_USER_REQUEST, handleCreateUserRequest);
  yield takeLatest(ACTIONS.DELETE_USER_REQUEST, handleDeleteUserRequest);
}
