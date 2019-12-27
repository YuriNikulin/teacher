import { IStore } from '@store/reducer';

export const isLoggedSelector = (state: IStore) => {
  return state.auth.isLogged;
};

export const isLoadingSelector = (state: IStore) => {
  return state.auth.isLoading;
};

export const userSelector = (state: IStore) => {
  return state.auth.user;
};
