import { Order } from '../../types';
import { wsActions, ActionWSTypes } from '../actions/ws/types';

interface IState {
  orders: Order[];

  loader: boolean;
  total: number;
  totalToday: number;

  wsConnected: boolean;
  wsConnectionFailed: boolean;
}
export const initialState: IState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loader: false,
  wsConnected: false,
  wsConnectionFailed: false,
};

export default function orderReducer(
  state = initialState,
  action: wsActions
): IState {
  switch (action.type) {
    case ActionWSTypes.WS_CONNECTION_START:
      return {
        ...state,
      };
    case ActionWSTypes.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsConnectionFailed: false,
      };
    case ActionWSTypes.WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case ActionWSTypes.WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsConnectionFailed: false,
      };
    case ActionWSTypes.WS_CONNECTION_STOP:
      return {
        ...state,
        wsConnected: false,
        wsConnectionFailed: false,
      };
    default:
      return state;
  }
}
