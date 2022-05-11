import { OPENMODAL, CLOSEMODAL } from "./types";
export const ModalActionCreators = {
  openModalAction: obj => ({
    type: OPENMODAL,
    payload: obj,
  }),
  closeModalAction: () => ({ type: CLOSEMODAL }),
};
