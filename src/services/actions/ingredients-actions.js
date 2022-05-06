import { fetchRequest } from "../../api/index";
export const INGREDIENTS_FETCH = "INGREDIENTS_FETCH";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";
export const INGREDIENTS_SELECTED = "INGREDIENTS_SELECTED";
export const CLEAR_INGREDIENTS_SELECTEDS = "CLEAR_INGREDIENTS_SELECTEDS";

export const getIngredients = () => dispatch => {
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
};
