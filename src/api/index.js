import { BASE_URL } from "../utils/constans";
export const fetchRequest = async api => {
  const url = `${BASE_URL}${api}`;
  return await fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
};
