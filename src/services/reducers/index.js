import ingredients from "./ingredients";
import modal from "./modal";
import burgerReducer from "./constructor";
import order from "./order";
const reducers = {
  ingredientsState: ingredients,
  burgerState: burgerReducer,
  modalState: modal,
  orderState: order,
};
export default reducers;
