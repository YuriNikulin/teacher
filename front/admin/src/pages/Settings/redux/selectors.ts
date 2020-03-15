import { IStore } from '@store/reducer';
import { SETTINGS_FORM_NAME } from './constants';

export const isLoadingSelector = (state: IStore) => {
  return state[SETTINGS_FORM_NAME].isLoading;
};

export const settingsSelector = (state: IStore) => {
  return state[SETTINGS_FORM_NAME].settings;
};
