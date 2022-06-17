import ingredients from "./ingredients";
import modal from "./modal";
import burgerReducer from "./constructor";
import order from "./order";
import user from "./user";
const reducers = {
  ingredientsState: ingredients,
  burgerState: burgerReducer,
  modalState: modal,
  orderState: order,
  userState: user,
};
export default reducers;
