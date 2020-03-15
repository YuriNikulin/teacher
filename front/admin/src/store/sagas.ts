import { all, fork } from 'redux-saga/effects';
import loginSaga from '@pages/Login/redux/saga';
import authSaga from '@pages/Auth/redux/saga';
import pagesSaga from '@pages/Page/redux/saga';
import usersSaga from '@pages/Users/redux/saga';
import menusSaga from '@pages/Menu/redux/saga';
import settingsSaga from '@pages/Settings/redux/saga';

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(authSaga), fork(pagesSaga), fork(usersSaga), fork(menusSaga), fork(settingsSaga)]);
}
