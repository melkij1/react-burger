import { fetchRequest } from "../../../api/index";
import {
  INGREDIENTS_FETCH,
  INGREDIENTS_ERROR,
  INGREDIENTS_SELECTED,
} from "./types";

export const IngredientsActionCreators = {
  getIngredients: () => dispatch => {
    fetchRequest("/ingredients")
      .then(response => {
        const { data, success } = response;
        if (success && data) {
          dispatch({ type: INGREDIENTS_FETCH, payload: data });
        }
      })
      .catch(error => {
        dispatch({ type: INGREDIENTS_ERROR, payload: true });
      });
  },
  setIngredientSelected: ingredient => ({
    type: INGREDIENTS_SELECTED,
    payload: ingredient,
  }),
};
