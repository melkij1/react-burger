import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

//Для ревьюера случайно сделал типизацию стора раньше времени. Если будут замечения по стору в следующем спринте поправлю.

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    // args: () => any;
  }
}
// const rootReducer = combineReducers(reducers);
// const enhancer = compose(
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__
//     ? (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose)
//     : (args) => args
// );
// const enhancer =
//   (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;
export const store = createStore(rootReducer, applyMiddleware(thunk));
