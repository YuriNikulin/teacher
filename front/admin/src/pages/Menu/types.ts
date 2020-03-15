export interface IMenuReducer {
  isLoading: boolean;
  isFormLoading: boolean;
  menus: IMenu[];
}

export interface IMenu {
  id: string;
  url: string;
  title: string;
  order?: number;
}

export type Error = Partial<IMenu>;
