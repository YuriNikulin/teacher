import { IUser } from '@pages/Auth/types';

export type Error = Partial<IUser> | string;

export interface IUsersReducer {
  isLoading: boolean;
  users: Array<IUser>;
  error?: Error;
  isFormLoading: boolean;
}
