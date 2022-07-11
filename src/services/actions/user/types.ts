export enum ActionUserTypes {
  SET_USER = 'SET_USER',
  SET_USERAUTH = 'SET_USERAUTH',
  SET_FORGOT_PASSWORD = 'SET_FORGOT_PASSWORD',
}
export interface IUser {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
}
interface setUser {
  type: ActionUserTypes.SET_USER;
  payload: IUser;
}
interface setUserAuth {
  type: ActionUserTypes.SET_USERAUTH;
}
interface setPassword {
  type: ActionUserTypes.SET_FORGOT_PASSWORD;
  payload: boolean;
}

export type UserAction = setUser | setUserAuth | setPassword;
