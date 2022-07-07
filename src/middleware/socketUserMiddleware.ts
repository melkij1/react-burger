import Cookies from 'js-cookie';
import { Middleware, MiddlewareAPI } from 'redux';

import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE,
} from '../services/actions/ws/types';

export const socketUserMiddleware =
  (wsUrl: string): Middleware =>
  (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const accessToken = Cookies.get('accessToken');
      const token = accessToken?.split('Bearer ')[1];
      if (type === WS_USER_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      if (type === WS_USER_CONNECTION_CLOSED) {
        if (socket !== null) {
          socket.close(1000, 'Page closed by user');
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: WS_USER_CONNECTION_SUCCESS,
            payload: event,
          });
        };

        socket.onerror = (event) => {
          dispatch({
            type: WS_USER_CONNECTION_ERROR,
            payload: event,
          });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          if (data?.includes('ping')) {
            if (socket !== null) {
              socket.send('pong');
            }
          }
          const { success, orders, total, totalToday } = JSON.parse(data);

          if (success) {
            dispatch({
              type: WS_USER_GET_MESSAGE,
              payload: {
                orders,
                total,
                totalToday,
              },
            });
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_USER_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_USER_GET_MESSAGE) {
          socket.send(JSON.stringify(payload));
        }
      }
      next(action);
    };
  };
