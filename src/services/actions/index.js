import { OrderActionCreators } from "./order/order-actions";
import { ConstructorActionCreators } from "./constructor/constructor-actions";
import { IngredientsActionCreators } from "./ingredients/ingredients-actions";
import { ModalActionCreators } from "./modal/modal-actions";
export const allActionCreators = {
  ...OrderActionCreators,
  ...ConstructorActionCreators,
  ...IngredientsActionCreators,
  ...ModalActionCreators,
};
