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

export const onePageSelector = (state: IStore, id: string | number) => {
  return state[PAGE_FORM_NAME].pages.find(page => page.id === id);
};

export const oneDraftSelector = (state: IStore, id: string) => {
  return state[PAGE_FORM_NAME].drafts[id];
};
