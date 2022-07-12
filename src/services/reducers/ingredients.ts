import { ingredientType } from '../../types';
import {
  ActionIngredientsTypes,
  IngredientAction,
} from '../actions/ingredients/types';
//Для ревьюера случайно сделал типизацию стора раньше времени. Если будут замечения по стору в следующем спринте поправлю.
interface IngredientS {
  ingredients: ingredientType[] | [];
  ingredientSelect: ingredientType | object;
  error: boolean;
}

export const initialState: IngredientS = {
  ingredients: [],
  ingredientSelect: {},
  error: false,
};

const clearIngredientsSelecteds = (arr: ingredientType[]) => {
  arr.forEach((x) => (x.__v = 0));
  return arr;
};

export default function ingredientsReducer(
  state = initialState,
  action: IngredientAction
): IngredientS {
  switch (action.type) {
    case ActionIngredientsTypes.INGREDIENTS_FETCH:
      return { ...state, ingredients: action.payload || [] };
    case ActionIngredientsTypes.INGREDIENTS_ERROR:
      return { ...state, error: action.payload };
    case ActionIngredientsTypes.INGREDIENTS_SELECTED:
      return { ...state, ingredientSelect: action.payload };
    case ActionIngredientsTypes.CLEAR_INGREDIENTS_SELECTEDS:
      return {
        ...state,
        ingredients: clearIngredientsSelecteds(state.ingredients),
      };
    default:
      return state;
  }
}
