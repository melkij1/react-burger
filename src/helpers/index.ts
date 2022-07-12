import { v4 as uuidv4 } from 'uuid';
import { ingredientType } from '../types';
export const sortArray = (
  array: ingredientType[],
  from: number,
  to: number
) => {
  const el = array.splice(from, 1)[0];
  array.splice(to, 0, el);
  return array;
};

export const getToken = (res: Response) => {
  let authToken;
  res.headers.forEach((header) => {
    if (header.indexOf('Bearer') === 0) {
      authToken = header.split('Bearer ')[1];
    }
  });
  return authToken;
};

export const addItemUUID = (obj: ingredientType) => {
  const uuid = uuidv4();
  const objClone = { ...obj };
  const objNew = Object.assign(objClone, { uuid });
  return objNew;
};

export const helperUUid = (
  newObj: ingredientType[],
  oldObj: ingredientType
) => {
  console.log(newObj, oldObj);
  oldObj.uuid = newObj[0].uuid;
  return oldObj;
};
