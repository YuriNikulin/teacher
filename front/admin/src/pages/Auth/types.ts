export interface IAuthReducer {
  isLoading: boolean;
  isLogged: boolean;
  user?: IUser;
}

export interface IUser {
  login: string;
  is_admin: boolean;
  currentPassword?: string;
  newPassword?: string;
  password?: string;
}
