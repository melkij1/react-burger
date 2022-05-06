import {
  INGREDIENTS_FETCH,
  INGREDIENTS_ERROR,
  INGREDIENTS_SELECTED,
  CLEAR_INGREDIENTS_SELECTEDS,
} from "../actions/ingredients-actions";

const initialState = {
  ingredients: [],
  ingredientSelect: {},
  error: false,
};

export default function ingredientsReducer(state = initialState, action) {
  switch (action.type) {
    case INGREDIENTS_FETCH:
      return { ...state, ingredients: action.payload };
    case INGREDIENTS_ERROR:
      return { ...state, error: action.payload };
    case INGREDIENTS_SELECTED:
      return { ...state, ingredientSelect: action.payload };
    case CLEAR_INGREDIENTS_SELECTEDS:
      const ingredients = [...state.ingredients].map(x => ({
        ...x,
        ...(x.__v = 0),
      }));
      return {
        ...state,
        ingredients,
      };
    default:
      return state;
  }
}
