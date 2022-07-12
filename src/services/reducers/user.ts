import { ActionUserTypes, UserAction } from '../actions/user/types';
//Для ревьюера случайно сделал типизацию стора раньше времени. Если будут замечения по стору в следующем спринте поправлю.
interface IState {
  user: any;
  isForgotPasswordRequest: boolean;
  isAuth: boolean;
}
export const initialState: IState = {
  user: null,
  isForgotPasswordRequest: false,
  isAuth: false,
};

export default function userReducer(
  state = initialState,
  action: UserAction
): IState {
  switch (action.type) {
    case ActionUserTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionUserTypes.SET_USERAUTH:
      return { ...state, isAuth: true };
    case ActionUserTypes.SET_FORGOT_PASSWORD:
      return { ...state, isForgotPasswordRequest: true };
    default:
      return state;
  }
}
