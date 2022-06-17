import { ActionOrderTypes, OrderAction } from "../actions/order/types";
interface IState {
  orderNumber: number;
  loader: boolean;
}
const initialState: IState = {
  orderNumber: 0,
  loader: false,
};

export default function orderReducer(
  state = initialState,
  action: OrderAction
): IState {
  switch (action.type) {
    case ActionOrderTypes.SET_ORDER:
      return {
        ...state,
        orderNumber: action.payload,
      };
    case ActionOrderTypes.SET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
}
