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

export interface IGetIngredientsSuccess {
  readonly type: typeof ActionIngredientsTypes.INGREDIENTS_FETCH;
  readonly payload: Array<ingredientType>;
}
export interface IGetIngredientsSelected {
  readonly type: typeof ActionIngredientsTypes.INGREDIENTS_SELECTED;
  readonly payload: ingredientType;
}
export interface IGetIngredientsCleare {
  readonly type: typeof ActionIngredientsTypes.CLEAR_INGREDIENTS_SELECTEDS;
  readonly payload: ingredientType;
}
export interface IGetIngredientsError {
  readonly type: typeof ActionIngredientsTypes.INGREDIENTS_ERROR;
  readonly payload: boolean;
}

export type IngredientAction =
  | INGREDIENTS_FETCH
  | SetError
  | SetIngredientSelected
  | SetClearIngredientSelected;
