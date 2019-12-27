export interface IPage {
  name: string;
  url: string;
  title: string;
  styles: string;
  id: string;
  blocks?: Array<any>;
}

export type Error = Partial<IPage> | string;

export interface IPageReducer {
  isLoading: boolean;
  error?: Error;
  pages: Array<IPage>;
}
