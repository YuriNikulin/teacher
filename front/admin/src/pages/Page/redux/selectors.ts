import { IStore } from '@store/reducer';
import { PAGE_FORM_NAME } from './constants';

export const isLoadingSelector = (state: IStore) => {
  return state[PAGE_FORM_NAME].isLoading;
};

export const pagesSelector = (state: IStore) => {
  return state[PAGE_FORM_NAME].pages;
};
