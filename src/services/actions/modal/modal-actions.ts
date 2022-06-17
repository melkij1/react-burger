import { ActionModalTypes, ModalAction } from "./types";
export const ModalActionCreators = {
  openModalAction: (obj: {
    modalIsOpen: boolean;
    mode: string;
  }): ModalAction => ({
    type: ActionModalTypes.OPENMODAL,
    payload: obj,
  }),
  closeModalAction: (): ModalAction => ({ type: ActionModalTypes.CLOSEMODAL }),
};
