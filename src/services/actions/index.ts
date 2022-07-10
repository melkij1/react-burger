import { OrderActionCreators } from './order/order-actions';
import { ConstructorActionCreators } from './constructor/constructor-actions';
import { IngredientsActionCreators } from './ingredients/ingredients-actions';
import { ModalActionCreators } from './modal/modal-actions';
import { UserActionsCreator } from './user/user-actions';
import { WS } from './ws/ws-actions';
export const allActionCreators = {
  ...OrderActionCreators,
  ...ConstructorActionCreators,
  ...IngredientsActionCreators,
  ...ModalActionCreators,
  ...UserActionsCreator,
  ...WS,
};
