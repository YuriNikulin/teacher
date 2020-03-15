import { IStore } from '@store/reducer';
import { MENU_FORM_NAME } from './constants';

export const isLoadingSelector = (state: IStore) => {
  return state[MENU_FORM_NAME].isLoading;
};

export const isFormLoadingSelector = (state: IStore) => {
  return state[MENU_FORM_NAME].isFormLoading;
};

export const menusSelector = (state: IStore) => {
  return state[MENU_FORM_NAME].menus;
};

export const oneMenuSelector = (state: IStore, id: string) => {
  return state[MENU_FORM_NAME].menus.find(menu => `${menu.id}` === `${id}`);
};
