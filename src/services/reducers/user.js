import { SET_USER } from "../actions/user/user-actions";
const initialState = {
  user: null,
  isForgotPasswordRequest: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
