import { ingredientType } from "../../../types";

export enum ActionConstructorTypes {
  SET_BUN = "SET_BUN",
  SET_INGREDIENT = "SET_INGREDIENT",
  SET_PRICE = "SET_PRICE",
  SORT_INGREDIENT = "SORT_INGREDIENT",
  REMOVE_INGREDIENT = "REMOVE_INGREDIENT",
  REMOVE_BUN = "REMOVE_BUN",
  CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR",
}

interface SetBun {
  type: ActionConstructorTypes.SET_BUN;
  payload: ingredientType;
}
interface SetIngredient {
  type: ActionConstructorTypes.SET_INGREDIENT;
  payload: ingredientType;
}
interface SetPrice {
  type: ActionConstructorTypes.SET_PRICE;
  payload: number;
}
interface SortIngredientActions {
  type: ActionConstructorTypes.SORT_INGREDIENT;
  payload: { index: number; atIndex: number };
}
interface RemoveIngredient {
  type: ActionConstructorTypes.REMOVE_INGREDIENT;
  payload: number;
}
interface RemoveBun {
  type: ActionConstructorTypes.REMOVE_BUN;
}
interface ClearConstructor {
  type: ActionConstructorTypes.CLEAR_CONSTRUCTOR;
}

export type ConstructorAction =
  | SetBun
  | SetIngredient
  | SetPrice
  | SortIngredientActions
  | RemoveIngredient
  | RemoveBun
  | ClearConstructor;
