import {
  SET_BUN,
  SET_INGREDIENT,
  SET_PRICE,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  REMOVE_BUN,
  SORT_INGREDIENT,
} from "../actions/constructor/types";

import { sortArray } from "../../helpers";
const initialState = {
  burderConstructor: {
    bun: [],
    ingredients: [],
  },
  totalPrice: 0,
};

export default function burgerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUN:
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          bun: [...state.burderConstructor.bun, action.payload],
        },
      };
    case SET_INGREDIENT:
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          ingredients: [...state.burderConstructor.ingredients, action.payload],
        },
      };
    case SORT_INGREDIENT:
      const { index, atIndex } = action.payload;
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          ingredients: sortArray(
            [...state.burderConstructor.ingredients],
            index,
            atIndex
          ),
        },
      };
    case SET_PRICE:
      return { ...state, totalPrice: action.payload };
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        burderConstructor: {
          bun: [],
          ingredients: [],
        },
      };
    case REMOVE_BUN:
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          bun: [],
        },
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          ingredients: state.burderConstructor.ingredients.filter(
            (x, idx) => idx !== action.payload
          ),
        },
      };
    default:
      return state;
  }
}
