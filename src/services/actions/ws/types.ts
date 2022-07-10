import { Order } from '../../../types';

export enum ActionWSTypes {
  WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS',
  WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR',
  WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED',
  WS_GET_MESSAGE = 'WS_GET_MESSAGE',
  WS_SEND_MESSAGE = 'WS_SEND_MESSAGE',
  WS_CONNECTION_START = 'WS_CONNECTION_START',
  WS_CONNECTION_STOP = 'WS_CONNECTION_STOP',
}

interface wsConnectionStart {
  type: ActionWSTypes.WS_CONNECTION_START;
  payload: string;
}
interface wsConnectionSuccess {
  type: ActionWSTypes.WS_CONNECTION_SUCCESS;
}
interface wsConnectionError {
  type: ActionWSTypes.WS_CONNECTION_ERROR;
}
interface wsConnectionClosed {
  type: ActionWSTypes.WS_CONNECTION_CLOSED;
}
interface wsConnectionStop {
  type: ActionWSTypes.WS_CONNECTION_STOP;
}
interface wsConnectionGetMessage {
  type: ActionWSTypes.WS_GET_MESSAGE;
  payload: { orders: Order[]; total: number; totalToday: number };
}
interface wsConnectionSengMessage {
  type: ActionWSTypes.WS_SEND_MESSAGE;
  payload: string;
}

export type wsActions =
  | wsConnectionStart
  | wsConnectionSuccess
  | wsConnectionError
  | wsConnectionClosed
  | wsConnectionStop
  | wsConnectionGetMessage
  | wsConnectionSengMessage;
