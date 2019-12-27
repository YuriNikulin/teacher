import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '@store/reducer';
import api from '@helpers/api';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware(
  {
    context:{
      api
    }
  }
);

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => any;
};

const isReduxDevtoolsExtenstionExist = (arg: Window | WindowWithDevTools): arg is WindowWithDevTools => {
  return '__REDUX_DEVTOOLS_EXTENSION__' in arg;
};

const enhansers = [applyMiddleware(sagaMiddleware)];

if (isReduxDevtoolsExtenstionExist(window)) {
  enhansers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducer, compose(...enhansers));

sagaMiddleware.run(rootSaga);

export default store;
