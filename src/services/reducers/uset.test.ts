import { allActionCreators } from '../actions';
import { UserAction } from '../actions/user/types';
import reducer, { initialState } from './user';

describe('Проверка редьюсера UserReducer', () => {
  it('Проверка начального состония', () => {
    expect(reducer(undefined, {} as UserAction)).toEqual(initialState);
  });
  it('Проверка назначение авторизованного пользователя', () => {
    expect(reducer(initialState, allActionCreators.setUserAuth())).toEqual({
      ...initialState,
      isAuth: true,
    });
  });
  it('Проверка смены пароля', () => {
    expect(
      reducer(initialState, allActionCreators.setForgotPassword(true))
    ).toEqual({
      ...initialState,
      isForgotPasswordRequest: true,
    });
  });
  it('Проверка сохранения данных пользователя', () => {
    const payload = {
      email: 'mixa.sobakin@yandex.ru',
      name: 'Ммм12323452345',
    };
    expect(reducer(initialState, allActionCreators.setUser(payload))).toEqual({
      ...initialState,
      user: payload,
    });
  });
});
