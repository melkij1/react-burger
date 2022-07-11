import {
  dataBunIngredient,
  dataIngredients,
} from '../../utils/mocks/mock-ingredients';
import { allActionCreators } from '../actions';
import { IngredientAction } from '../actions/ingredients/types';
import reducer, { initialState } from './ingredients';

describe('Проверка редьюсера IngredientsReducer', () => {
  it('Проверка начального состония', () => {
    expect(reducer(undefined, {} as IngredientAction)).toEqual(initialState);
  });
  it('Проверка на добавление ингредиентов', () => {
    expect(
      reducer(
        initialState,
        allActionCreators.getIngredientsSuccess(dataIngredients)
      )
    ).toEqual({
      ...initialState,
      ingredients: dataIngredients,
    });
  });
  it('Проверка на выбранный ингредиент', () => {
    expect(
      reducer(
        initialState,
        allActionCreators.setIngredientSelected(dataBunIngredient)
      )
    ).toEqual({
      ...initialState,
      ingredientSelect: dataBunIngredient,
    });
  });
  it('Проверка на удаление выбранного ингредиент', () => {
    expect(
      reducer(
        initialState,
        allActionCreators.getIngredientsСleare(dataBunIngredient)
      )
    ).toEqual({
      ...initialState,
      ingredientSelect: {},
    });
  });
  it('Проверка на передачу ошибки', () => {
    expect(
      reducer(initialState, allActionCreators.getIngredientsError(true))
    ).toEqual({
      ...initialState,
      error: true,
    });
  });
});
