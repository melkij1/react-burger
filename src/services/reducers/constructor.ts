import {
  ActionConstructorTypes,
  ConstructorAction,
} from '../actions/constructor/types';
//Для ревьюера случайно сделал типизацию стора раньше времени. Если будут замечения по стору в следующем спринте поправлю.
import { sortArray } from '../../helpers';
import { ConstructorState } from '../../types';
export const initialState: ConstructorState = {
  burderConstructor: {
    bun: [],
    ingredients: [],
  },
  totalPrice: 0,
};

export default function burgerReducer(
  state = initialState,
  action: ConstructorAction
): ConstructorState {
  switch (action.type) {
    case ActionConstructorTypes.SET_BUN:
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          bun: [...state.burderConstructor.bun, action.payload],
        },
      };
    case ActionConstructorTypes.SET_INGREDIENT:
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          ingredients: [...state.burderConstructor.ingredients, action.payload],
        },
      };
    case ActionConstructorTypes.SORT_INGREDIENT:
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
    case ActionConstructorTypes.SET_PRICE:
      return { ...state, totalPrice: action.payload };
    case ActionConstructorTypes.CLEAR_CONSTRUCTOR:
      return {
        ...state,
        burderConstructor: {
          bun: [],
          ingredients: [],
        },
      };
    case ActionConstructorTypes.REMOVE_BUN:
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          bun: [],
        },
      };
    case ActionConstructorTypes.REMOVE_INGREDIENT:
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
