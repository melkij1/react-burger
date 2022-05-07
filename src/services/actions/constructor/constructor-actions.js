import {
  SET_BUN,
  SET_INGREDIENT,
  SET_PRICE,
  SORT_INGREDIENT,
  REMOVE_INGREDIENT,
  REMOVE_BUN,
} from "./types";

export const ConstructorActionCreators = {
  setBun: obj => ({ type: SET_BUN, payload: obj }),
  setIngredient: obj => ({ type: SET_INGREDIENT, payload: obj }),
  setPrice: price => ({ type: SET_PRICE, payload: price }),
  sortIngredientActions: obj => ({ type: SORT_INGREDIENT, payload: obj }),
  removeIngredient: index => ({ type: REMOVE_INGREDIENT, payload: index }),
  removeBun: () => ({ type: REMOVE_BUN }),
};
