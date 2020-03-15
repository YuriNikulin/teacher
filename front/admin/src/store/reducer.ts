import { combineReducers } from 'redux';
import { reducer as formReducer, FormReducer } from 'redux-form';
import { ILoginReducer } from '@pages/Login/types';
import login from '@pages/Login/redux/reducer';
import { IAuthReducer } from '@pages/Auth/types';
import auth from '@pages/Auth/redux/reducer';
import page from '@pages/Page/redux/reducer';
import user from '@pages/Users/redux/reducer';
import menu from '@pages/Menu/redux/reducer';
import settings from '@pages/Settings/redux/reducer';
import { IPageReducer } from '@pages/Page/types';
import { IUsersReducer } from '@pages/Users/types';
import { IMenuReducer } from '@pages/Menu/types';
import { ISettingsReducer } from '@pages/Settings/types';
export interface IStore {
  form: FormReducer;
  login: ILoginReducer;
  auth: IAuthReducer;
  page: IPageReducer;
  user: IUsersReducer;
  menu: IMenuReducer;
  settings: ISettingsReducer;
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
  user,
  menu,
  settings,
});
