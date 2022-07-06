import { Order } from '../../types';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_USER_GET_MESSAGE,
} from '../actions/ws/types';

interface IState {
  orders: Order[];
  ordersUser: Order[];
  loader: boolean;
  total: number;
  totalToday: number;
  wsConnected: boolean;
  wsConnectionFailed: boolean;
}
const initialState: IState = {
  orders: [],
  ordersUser: [],
  total: 0,
  totalToday: 0,
  loader: false,
  wsConnected: false,
  wsConnectionFailed: false,
};

export default function orderReducer(
  state = initialState,
  action: any
): IState {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsConnectionFailed: false,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        ordersUser: action.payload.orders,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsConnectionFailed: false,
      };
    // case ActionOrderTypes.SET_ORDER:
    //   return {
    //     ...state,
    //     orderNumber: action.payload,
    //   };
    // case ActionOrderTypes.SET_LOADER:
    //   return {
    //     ...state,
    //     loader: action.payload,
    //   };
    default:
      return state;
  }
}
