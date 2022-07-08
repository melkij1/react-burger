import { ingredientType } from '../types';

export const sortArray = (
  array: ingredientType[],
  from: number,
  to: number
) => {
  console.log(array, from, to, 'sort');
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
