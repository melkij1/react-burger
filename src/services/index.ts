import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../middleware/socketMiddleware';
// import { socketUserMiddleware } from '../middleware/socketUserMiddleware';
import { ActionWSTypes } from './actions/ws/types';
import { useDispatch } from 'react-redux';
// const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
// const wsUserUrl = 'wss://norma.nomoreparties.space/orders';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    // args: () => any;
  }
}
const socketObject = {
  WS_CONNECTION_SUCCESS: ActionWSTypes.WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR: ActionWSTypes.WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED: ActionWSTypes.WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE: ActionWSTypes.WS_GET_MESSAGE,
  WS_SEND_MESSAGE: ActionWSTypes.WS_SEND_MESSAGE,
  WS_CONNECTION_START: ActionWSTypes.WS_CONNECTION_START,
  WS_CONNECTION_STOP: ActionWSTypes.WS_CONNECTION_STOP,
};
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, socketMiddleware(socketObject))
);

//Для ревьюера тут нужен импорт useDispatch,
//так как он используется в создании переменной useAppDispatch которая получается типизированная и используется в хуке useActions
//хук useActions получается доступ ко всем диспатчамм и уще видит их как типизированные.
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
