export interface ILoginState {
  login: string;
  password: string;
}

export type Error = Partial<ILoginState> | string;

export interface ILoginReducer {
  isLoading: boolean;
  error?: Error
}