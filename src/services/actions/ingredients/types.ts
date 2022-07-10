import { ingredientType } from '../../../types';

export enum ActionIngredientsTypes {
  INGREDIENTS_FETCH = 'INGREDIENTS_FETCH',
  INGREDIENTS_ERROR = 'INGREDIENTS_ERROR',
  INGREDIENTS_SELECTED = 'INGREDIENTS_SELECTED',
  CLEAR_INGREDIENTS_SELECTEDS = 'CLEAR_INGREDIENTS_SELECTEDS',
}

interface INGREDIENTS_FETCH {
  type: ActionIngredientsTypes.INGREDIENTS_FETCH;
  payload: ingredientType[];
}
interface SetError {
  type: ActionIngredientsTypes.INGREDIENTS_ERROR;
  payload: boolean;
}
interface SetIngredientSelected {
  type: ActionIngredientsTypes.INGREDIENTS_SELECTED;
  payload: ingredientType;
}
interface SetClearIngredientSelected {
  type: ActionIngredientsTypes.CLEAR_INGREDIENTS_SELECTEDS;
  // payload: { index: number; atIndex: number };
}

export type IngredientAction =
  | INGREDIENTS_FETCH
  | SetError
  | SetIngredientSelected
  | SetClearIngredientSelected;
