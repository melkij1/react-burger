import { allActionCreators } from '../actions';
import { OrderAction } from '../actions/order/types';
import reducer, { initialState } from './order';

describe('Проверка редьюсера OrderReducer', () => {
  it('Проверка начального состония', () => {
    expect(reducer(undefined, {} as OrderAction)).toEqual(initialState);
  });
  it('Проверка сохранения значение ордера модалки', () => {
    expect(
      reducer(initialState, allActionCreators.setOrderNumber(123))
    ).toEqual({
      ...initialState,
      orderNumber: 123,
    });
  });
  it('Проверка лоудера в order', () => {
    expect(reducer(initialState, allActionCreators.setIsLoader(true))).toEqual({
      ...initialState,
      loader: true,
    });
  });
});
