export interface ISettings {
  favicon?: string;
  logo?: string;
  site_background?: string;
  site_background_image?: string;
  content_background?: string;
}

export interface ISettingsReducer {
  settings: ISettings | null;
  isLoading: boolean;
}
