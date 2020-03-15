import { IStore } from '@store/reducer';
import { USER_FORM_NAME } from './constants';
import { IUser } from '@pages/Auth/types';

export const isLoadingSelector = (state: IStore) => {
  return state[USER_FORM_NAME].isLoading;
};

export const usersSelector = (state: IStore) => {
  return state[USER_FORM_NAME].users;
};

export const oneUserSelector = (state: IStore, login: IUser['login']) => {
  return state[USER_FORM_NAME].users.find(user => user.login === login);
};

export const errorSelector = (state: IStore) => {
  return state[USER_FORM_NAME].error;
};
