import { socketGet } from '../../utils/mocks/mock-feed';
import { allActionCreators } from '../actions';
import { wsActions } from '../actions/ws/types';
import reducer, { initialState } from './feed';

describe('Проверка редьюсера FeedReducer', () => {
  it('Проверка начального состония', () => {
    expect(reducer(undefined, {} as wsActions)).toEqual(initialState);
  });
  it('Проверка на соединение с сокетом', () => {
    expect(
      reducer(initialState, allActionCreators.wsConnectionSuccess())
    ).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });
  it('Проверка на закрытие с сокетом', () => {
    expect(
      reducer(initialState, allActionCreators.wsConnectionClosed())
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });
  it('Проверка на сохранение данные с сокетом', () => {
    expect(
      reducer(initialState, allActionCreators.wsConnectionGetMessage(socketGet))
    ).toEqual({
      ...initialState,
      orders: socketGet.orders,
      total: socketGet.total,
      totalToday: socketGet.totalToday,
    });
  });
  it('Проверка данные сокета на стоп', () => {
    expect(reducer(initialState, allActionCreators.wsConnectionStop())).toEqual(
      {
        ...initialState,
      }
    );
  });
});
