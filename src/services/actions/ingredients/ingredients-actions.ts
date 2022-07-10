import { fetchRequest } from '../../../api/index';
import { ingredientType } from '../../../types';
import { ActionIngredientsTypes, IngredientAction } from './types';
import { Dispatch } from 'redux';

export const IngredientsActionCreators = {
  getIngredients: () => (dispatch: Dispatch<IngredientAction>) => {
    fetchRequest('/ingredients')
      .then((response) => {
        const { data, success } = response;
        if (success && data) {
          dispatch({
            type: ActionIngredientsTypes.INGREDIENTS_FETCH,
            payload: data || [],
          });
        } else {
          dispatch({
            type: ActionIngredientsTypes.INGREDIENTS_FETCH,
            payload: [],
          });
        }
      })
      .catch((error) => {
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
