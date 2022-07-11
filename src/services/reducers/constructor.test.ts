import { v4 as uuidv4 } from 'uuid';
import { addItemUUID, helperUUid } from '../../helpers';
import {
  dataBunIngredient,
  dataItemIngredients,
} from '../../utils/mocks/mock-ingredients';
import { allActionCreators } from '../actions';
import { ConstructorAction } from '../actions/constructor/types';
import reducer, { initialState } from './constructor';

describe('Проверка редьюсера ConstructorReducer', () => {
  it('Проверка начального состония', () => {
    expect(reducer(undefined, {} as ConstructorAction)).toEqual(initialState);
  });
  // it('Проверка на добавление булки в конструктор', () => {
  //   const result = reducer(
  //     initialState,
  //     allActionCreators.setBun(dataBunIngredient)
  //   );
  //   expect(result).toEqual({
  //     ...initialState,
  //     burderConstructor: {
  //       ingredients: [],
  //       bun: [initialState.burderConstructor.bun[0]],
  //     },
  //   });
  // });
  // it('Проверка на добавление ингредиента в конструктор', () => {
  //   const result = reducer(
  //     initialState,
  //     allActionCreators.setBun(dataItemIngredients)
  //   );
  //   expect(result).toEqual({
  //     ...initialState,
  //     burderConstructor: {
  //       ingredients: [initialState.burderConstructor.ingredients[0]],
  //       bun: [],
  //     },
  //   });
  //   // expect(result.burgerConstructor.bun[0].uuid).toBeDefined()
  // });
  // it('Проверка на добавление ингредиента в конструктор', () => {
  //   expect(
  //     reducer(
  //       initialState,
  //       allActionCreators.setIngredient(dataItemIngredients)
  //     )
  //   ).toEqual({
  //     ...initialState,
  //     burderConstructor: {
  //       bun: [],
  //       ingredients: [...initialState.burderConstructor.ingredients],
  //     },
  //   });
  // });
  it('Проверка на добавление цены', () => {
    const price = 1000;
    expect(reducer(initialState, allActionCreators.setPrice(price))).toEqual({
      ...initialState,
      totalPrice: price,
    });
  });
});
