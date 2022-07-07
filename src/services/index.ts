import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../middleware/socketMiddleware';
import { socketUserMiddleware } from '../middleware/socketUserMiddleware';
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUserUrl = 'wss://norma.nomoreparties.space/orders';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    // args: () => any;
  }
}

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl),
    socketUserMiddleware(wsUserUrl)
  )
);
