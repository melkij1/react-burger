import { Order } from '../../types';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
} from '../actions/ws/types';

interface IState {
  orders: Order[];
  ordersUser: Order[];
  loader: boolean;
  total: number;
  totalToday: number;
  totalUser: number;
  totalTodayUser: number;
  wsConnected: boolean;
  wsConnectionFailed: boolean;
  wsConnectedUser: boolean;
  wsConnectionFailedUser: boolean;
}
const initialState: IState = {
  orders: [],
  ordersUser: [],
  total: 0,
  totalToday: 0,
  totalUser: 0,
  totalTodayUser: 0,
  loader: false,
  wsConnected: false,
  wsConnectionFailed: false,
  wsConnectedUser: false,
  wsConnectionFailedUser: false,
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
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsConnectionFailed: false,
      };
    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        totalUser: action.payload.total,
        totalTodayUser: action.payload.totalToday,
      };
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnectedUser: true,
        wsConnectionFailedUser: false,
      };
    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnectedUser: false,
        wsConnectionFailedUser: false,
      };
    default:
      return state;
  }
}
