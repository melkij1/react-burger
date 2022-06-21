import { combineReducers } from 'redux';

import ingredients from './ingredients';
import modal from './modal';
import burgerReducer from './constructor';
import order from './order';
import user from './user';
export const rootReducer = combineReducers({
  ingredientsState: ingredients,
  burgerState: burgerReducer,
  modalState: modal,
  orderState: order,
  userState: user,
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
