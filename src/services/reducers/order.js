import { SET_ORDER, SET_LOADER } from "../actions/order/types";
const initialState = {
  orderNumber: 0,
  loader: false,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      console.log(action.payload);
      return {
        ...state,
        orderNumber: action.payload,
      };
    case SET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
}
