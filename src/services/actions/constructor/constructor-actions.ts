import { v4 as uuidv4 } from 'uuid';
import { ingredientType } from '../../../types';
import { ConstructorAction, ActionConstructorTypes } from './types';

export const ConstructorActionCreators = {
  setBun: (obj: ingredientType): ConstructorAction => {
    const uuid = uuidv4();
    const objClone = { ...obj };
    const objNew = Object.assign(objClone, { uuid });
    return {
      type: ActionConstructorTypes.SET_BUN,
      payload: objNew,
    };
  },
  // ({
  //   type: ActionConstructorTypes.SET_BUN,
  //   payload: obj,
  // }),
  setIngredient: (obj: ingredientType): ConstructorAction => {
    const uuid = uuidv4();
    const objClone = { ...obj };
    const objNew = Object.assign(objClone, { uuid });
    return { type: ActionConstructorTypes.SET_INGREDIENT, payload: objNew };
  },
  setPrice: (price: number): ConstructorAction => ({
    type: ActionConstructorTypes.SET_PRICE,
    payload: price,
  }),
  sortIngredientActions: (obj: {
    index: number;
    atIndex: number;
  }): ConstructorAction => ({
    type: ActionConstructorTypes.SORT_INGREDIENT,
    payload: obj,
  }),
  removeIngredient: (index: number): ConstructorAction => ({
    type: ActionConstructorTypes.REMOVE_INGREDIENT,
    payload: index,
  }),
  removeBun: (): ConstructorAction => ({
    type: ActionConstructorTypes.REMOVE_BUN,
  }),
};
