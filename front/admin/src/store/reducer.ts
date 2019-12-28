import APP_STORE_CONSTANTS from './constants';
import { combineReducers } from 'redux';
import { reducer as formReducer, FormReducer } from 'redux-form';
import { ILoginReducer } from '@pages/Login/types';
import login from '@pages/Login/redux/reducer';
import { IAuthReducer } from '@pages/Auth/types';
import auth from '@pages/Auth/redux/reducer';
import page from '@pages/Page/redux/reducer';
import { IPageReducer } from '@pages/Page/types';

export interface IStore {
  form: FormReducer;
  login: ILoginReducer;
  auth: IAuthReducer;
  page: IPageReducer;
}

const initialState = {};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  app: reducer,
  form: formReducer,
  login,
  auth,
  page,
});
