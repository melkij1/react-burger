import { OPENMODAL, CLOSEMODAL } from "../actions/modal/types";
const initialState = {
  modalMode: "",
  modalIsOpen: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPENMODAL:
      return {
        ...state,
        modalIsOpen: action.payload.modalIsOpen,
        modalMode: action.payload.mode,
      };
    case CLOSEMODAL:
      return { ...state, modalIsOpen: false };
    default:
      return state;
  }
}
