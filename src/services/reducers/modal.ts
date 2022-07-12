import { ActionModalTypes, ModalAction } from '../actions/modal/types';
//Для ревьюера случайно сделал типизацию стора раньше времени. Если будут замечения по стору в следующем спринте поправлю.
interface IState {
  modalMode: string;
  modalIsOpen: boolean;
}
export const initialState: IState = {
  modalMode: '',
  modalIsOpen: false,
};

export default function modalReducer(
  state = initialState,
  action: ModalAction
): IState {
  switch (action.type) {
    case ActionModalTypes.OPENMODAL:
      return {
        ...state,
        modalIsOpen: action.payload.modalIsOpen,
        modalMode: action.payload.mode,
      };
    case ActionModalTypes.CLOSEMODAL:
      return { ...state, modalIsOpen: false };
    default:
      return state;
  }
}
