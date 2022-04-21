import { BASE_URL } from "../utils/constans";
export const fetchRequest = async api => {
  const url = `${BASE_URL}${api}`;
  return await fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.status);
    })
    .catch(error => console.error(error));
};
