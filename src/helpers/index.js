export const sortArray = (array, from, to) => {
  const el = array.splice(from, 1)[0];
  array.splice(to, 0, el);
  return array;
};
