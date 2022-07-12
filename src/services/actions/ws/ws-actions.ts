import { OrderArray } from '../../../types';
import { ActionWSTypes, wsActions } from './types';

export const WS = {
  wsConnectionSuccess: (): wsActions => ({
    type: ActionWSTypes.WS_CONNECTION_SUCCESS,
  }),
  wsConnectionStart: (payload: string): wsActions => ({
    type: ActionWSTypes.WS_CONNECTION_START,
    payload: payload,
  }),
  wsConnectionError: (): wsActions => ({
    type: ActionWSTypes.WS_CONNECTION_ERROR,
  }),
  wsConnectionClosed: (): wsActions => ({
    type: ActionWSTypes.WS_CONNECTION_CLOSED,
  }),
  wsConnectionGetMessage: (payload: OrderArray): wsActions => ({
    type: ActionWSTypes.WS_GET_MESSAGE,
    payload: payload,
  }),
  wsConnectionSengMessage: (payload: string): wsActions => ({
    type: ActionWSTypes.WS_SEND_MESSAGE,
    payload: payload,
  }),
  wsConnectionStop: (): wsActions => ({
    type: ActionWSTypes.WS_CONNECTION_STOP,
  }),
};
