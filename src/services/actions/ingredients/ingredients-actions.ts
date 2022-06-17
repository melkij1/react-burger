import { fetchRequest } from "../../../api/index";
import { ingredientType } from "../../../types";
import { ActionIngredientsTypes } from "./types";

export const IngredientsActionCreators = {
  getIngredients: () => (dispatch: any) => {
    fetchRequest("/ingredients")
      .then(response => {
        const { data, success } = response;
        if (success && data) {
          dispatch({
            type: ActionIngredientsTypes.INGREDIENTS_FETCH,
            payload: data,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: ActionIngredientsTypes.INGREDIENTS_ERROR,
          payload: true,
        });
      });
  },
  setIngredientSelected: (ingredient: ingredientType) => ({
    type: ActionIngredientsTypes.INGREDIENTS_SELECTED,
    payload: ingredient,
  }),
};
