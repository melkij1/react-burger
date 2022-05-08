import {
  INGREDIENTS_FETCH,
  INGREDIENTS_ERROR,
  INGREDIENTS_SELECTED,
  CLEAR_INGREDIENTS_SELECTEDS,
} from "../actions/ingredients/types";

const initialState = {
  ingredients: [],
  ingredientSelect: {},
  error: false,
};

const clearIngredientsSelecteds = arr => {
  arr.forEach(x => (x.__v = 0));
  return arr;
};

export default function ingredientsReducer(state = initialState, action) {
  switch (action.type) {
    case INGREDIENTS_FETCH:
      return { ...state, ingredients: action.payload };
    case INGREDIENTS_ERROR:
      return { ...state, error: action.payload };
    case INGREDIENTS_SELECTED:
      return { ...state, ingredientSelect: action.payload };
    // case UPDATE_INGREDIENTS:
    //   return { ...state, ingredients: action.payload };
    case CLEAR_INGREDIENTS_SELECTEDS:
      return {
        ...state,
        ingredients: clearIngredientsSelecteds(state.ingredients),
      };
    default:
      return state;
  }
}
