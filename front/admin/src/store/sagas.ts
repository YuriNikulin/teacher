import { all, fork } from 'redux-saga/effects';
import loginSaga from '@pages/Login/redux/saga';
import authSaga from '@pages/Auth/redux/saga';
import pagesSaga from '@pages/PagesList/redux/saga';

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(authSaga), fork(pagesSaga)]);
}
