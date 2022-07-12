import { allActionCreators } from '../actions';
import { ModalAction } from '../actions/modal/types';
import reducer, { initialState } from './modal';

describe('Проверка редьюсера ModalReducer', () => {
  it('Проверка начального состония', () => {
    expect(reducer(undefined, {} as ModalAction)).toEqual(initialState);
  });
  it('Проверка открытие модалки', () => {
    expect(
      reducer(
        initialState,
        allActionCreators.openModalAction({
          modalIsOpen: true,
          mode: 'FeedDetails',
        })
      )
    ).toEqual({
      ...initialState,
      modalIsOpen: true,
      modalMode: 'FeedDetails',
    });
  });
  it('Проверка закрытие модалки', () => {
    expect(reducer(initialState, allActionCreators.closeModalAction())).toEqual(
      {
        ...initialState,
        modalIsOpen: false,
      }
    );
  });
});
