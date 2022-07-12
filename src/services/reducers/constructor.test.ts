import { v4 as uuidv4 } from 'uuid';
import { addItemUUID, helperUUid, sortArray } from '../../helpers';
import {
  dataBunIngredient,
  dataItem2Ingredients,
  dataItemIngredients,
} from '../../utils/mocks/mock-ingredients';
import { allActionCreators } from '../actions';
import { ConstructorAction } from '../actions/constructor/types';
import reducer, { initialState } from './constructor';

jest.mock('uuid', () => ({ v4: () => '8888' }));

describe('Проверка редьюсера ConstructorReducer', () => {
  it('Проверка начального состония', () => {
    expect(reducer(undefined, {} as ConstructorAction)).toEqual(initialState);
  });
  it('Проверка на добавление булки в конструктор', () => {
    const result = reducer(
      initialState,
      allActionCreators.setBun(dataBunIngredient)
    );

    expect(result).toEqual({
      ...initialState,
      burderConstructor: {
        ingredients: [],
        bun: [{ ...dataBunIngredient, uuid: '8888' }],
      },
    });
  });
  it('Проверка на добавление ингредиента в конструктор', () => {
    const result = reducer(
      initialState,
      allActionCreators.setIngredient(dataItemIngredients)
    );

    expect(result).toEqual({
      ...initialState,
      burderConstructor: {
        ingredients: [{ ...dataItemIngredients, uuid: '8888' }],
        bun: [],
      },
    });
  });
  it('Проверка на удаление булки в конструктор', () => {
    reducer(initialState, allActionCreators.setBun(dataBunIngredient));
    expect(reducer(initialState, allActionCreators.removeBun())).toEqual({
      ...initialState,
      burderConstructor: {
        ingredients: [],
        bun: [],
      },
    });
  });
  it('Проверка на удаление ингредиента в конструктор', () => {
    reducer(initialState, allActionCreators.setIngredient(dataItemIngredients));
    expect(
      reducer(initialState, allActionCreators.removeIngredient(0))
    ).toEqual({
      ...initialState,
      burderConstructor: {
        ingredients: [],
        bun: [],
      },
    });
  });
  it('Проверка на сортировку ингредиенов в конструктор', () => {
    const index = 0;
    const atIndex = 1;
    reducer(initialState, allActionCreators.setIngredient(dataItemIngredients));
    reducer(
      initialState,
      allActionCreators.setIngredient(dataItem2Ingredients)
    );
    const ingredients = [
      { ...dataItem2Ingredients, uuid: '8888' },
      { ...dataItemIngredients, uuid: '8888' },
    ];
    const result = reducer(
      initialState,
      allActionCreators.sortIngredientActions({ index, atIndex })
    );
    expect(result).toEqual({
      ...initialState,
      burderConstructor: {
        bun: [],
        ingredients,
      },
    });
  });
  it('Проверка на добавление цены', () => {
    const price = 1000;
    expect(reducer(initialState, allActionCreators.setPrice(price))).toEqual({
      ...initialState,
      totalPrice: price,
    });
  });
});
