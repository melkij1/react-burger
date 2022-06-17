import {
  SET_USER,
  SET_USERAUTH,
  SET_FORGOT_PASSWORD,
} from '../actions/user/user-actions';
const initialState = {
  user: null,
  isForgotPasswordRequest: false,
  isAuth: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USERAUTH:
      return { ...state, isAuth: true };
    case SET_FORGOT_PASSWORD:
      return { ...state, isForgotPasswordRequest: true };
    default:
      return state;
  }
}
