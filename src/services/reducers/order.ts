import { ActionOrderTypes, OrderAction } from '../actions/order/types';
//Для ревьюера случайно сделал типизацию стора раньше времени. Если будут замечения по стору в следующем спринте поправлю.
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
