import { combineReducers } from 'redux';
//Для ревьюера случайно сделал типизацию стора раньше времени. Если будут замечения по стору в следующем спринте поправлю.
import ingredients from './ingredients';
import modal from './modal';
import burgerReducer from './constructor';
import order from './order';
import user from './user';
import feed from './feed';
export const rootReducer = combineReducers({
  ingredientsState: ingredients,
  burgerState: burgerReducer,
  modalState: modal,
  orderState: order,
  userState: user,
  feedState: feed,
});
export type RootState = ReturnType<typeof rootReducer>;
// const reducers = {
//   ingredientsState: ingredients,
//   burgerState: burgerReducer,
//   modalState: modal,
//   orderState: order,
//   userState: user,
// };
// export default reducers;
