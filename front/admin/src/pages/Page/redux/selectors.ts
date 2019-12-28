import { IStore } from '@store/reducer';
import { PAGE_FORM_NAME } from './constants';

export const isLoadingSelector = (state: IStore) => {
  return state[PAGE_FORM_NAME].isLoading;
};

export const isFormLoadingSelector = (state: IStore) => {
  return state[PAGE_FORM_NAME].isFormLoading;
};

export const pagesSelector = (state: IStore) => {
  return state[PAGE_FORM_NAME].pages;
};

export const errorSelector = (state: IStore) => {
  return state[PAGE_FORM_NAME].error;
};
