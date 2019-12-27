import { IStore } from '@store/reducer';

export const isLoadingSelector = (state: IStore) => {
  return state.login.isLoading;
} 

export const errorsSelector = (state: IStore) => {
  return state.login.error;
}