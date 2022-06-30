export enum ActionModalTypes {
  OPENMODAL = "OPENMODAL",
  CLOSEMODAL = "CLOSEMODAL",
}

interface openModalAction {
  type: ActionModalTypes.OPENMODAL;
  payload: { modalIsOpen: boolean; mode: string };
}
interface closeModalAction {
  type: ActionModalTypes.CLOSEMODAL;
}

export type ModalAction = openModalAction | closeModalAction;
