import { fetchPost } from '../../../api/index';
import { ActionOrderTypes, OrderAction } from './types';
import { ActionModalTypes, ModalAction } from '../modal/types';
import { ActionIngredientsTypes, IngredientAction } from '../ingredients/types';
import {
  ActionConstructorTypes,
  ConstructorAction,
} from '../constructor/types';
import { Dispatch } from 'redux';
export const OrderActionCreators = {
  getOrder:
    (ingredientsData: string[]) =>
    (
      dispatch: Dispatch<
        OrderAction | ModalAction | IngredientAction | ConstructorAction
      >
    ) => {
      fetchPost('/orders', ingredientsData)
        .then((response): void => {
          const { success, order } = response;
          if (success && order) {
            dispatch({
              type: ActionOrderTypes.SET_ORDER,
              payload: order?.number,
            });
            dispatch({
              type: ActionModalTypes.OPENMODAL,
              payload: { modalIsOpen: true, mode: 'orderDetails' },
            });
            dispatch({ type: ActionConstructorTypes.CLEAR_CONSTRUCTOR });
            dispatch({
              type: ActionIngredientsTypes.CLEAR_INGREDIENTS_SELECTEDS,
            });
          }
        })
        .catch((err) => {
          console.error('Не получилось оформить заказ');
        })
        .finally(() => {
          dispatch({ type: ActionOrderTypes.SET_LOADER, payload: false });
        });
    },
  setIsLoader: (flag: boolean): OrderAction => ({
    type: ActionOrderTypes.SET_LOADER,
    payload: flag,
  }),
};
