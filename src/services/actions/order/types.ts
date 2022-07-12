export enum ActionOrderTypes {
  SET_ORDER = 'SET_ORDER',
  SET_LOADER = 'SET_LOADER',
}

interface setIsLoader {
  type: ActionOrderTypes.SET_LOADER;
  payload: boolean;
}
interface setOrder {
  type: ActionOrderTypes.SET_ORDER;
  payload: number;
}
interface setOrderNumber {
  type: ActionOrderTypes.SET_ORDER;
  payload: number;
}

export type OrderAction = setOrder | setIsLoader | setOrderNumber;
