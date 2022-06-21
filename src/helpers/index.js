export const sortArray = (array, from, to) => {
  const el = array.splice(from, 1)[0];
  array.splice(to, 0, el);
  return array;
};

export const getToken = (res) => {
  let authToken;
  res.headers.forEach((header) => {
    if (header.indexOf('Bearer') === 0) {
      authToken = header.split('Bearer ')[1];
    }
  });
  return authToken;
};
