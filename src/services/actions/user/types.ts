export enum ActionUserTypes {
  SET_USER = "SET_USER",
  SET_USERAUTH = "SET_USERAUTH",
  SET_FORGOT_PASSWORD = "SET_FORGOT_PASSWORD",
}

interface setUser {
  type: ActionUserTypes.SET_USER;
  payload: any;
}
interface setUserAuth {
  type: ActionUserTypes.SET_USERAUTH;
  payload: boolean;
}
interface setPassword {
  type: ActionUserTypes.SET_FORGOT_PASSWORD;
  payload: boolean;
}

export type UserAction = setUser | setUserAuth | setPassword;
