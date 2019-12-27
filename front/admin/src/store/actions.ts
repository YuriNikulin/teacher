import CONSTANTS from './constants';

export type IAddLoading = () => {
  type: typeof CONSTANTS.TYPE_ADD_LOADING;
};

export const addLoading: IAddLoading = () => {
  return {
    type: CONSTANTS.TYPE_ADD_LOADING,
  };
};

export type IRemoveLoading = () => {
  type: typeof CONSTANTS.TYPE_REMOVE_LOADING;
};

export const removeLoading: IRemoveLoading = () => {
  return {
    type: CONSTANTS.TYPE_REMOVE_LOADING,
  };
};

export type ISwitchTheme = (
  payload: string,
) => {
  type: typeof CONSTANTS.TYPE_SWITCH_THEME;
  payload: string;
};

export const switchTheme: ISwitchTheme = (payload: string) => {
  return {
    type: CONSTANTS.TYPE_SWITCH_THEME,
    payload,
  };
};
