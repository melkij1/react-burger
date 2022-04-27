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
  },
  fetchPost = async (api, body) => {
    console.log(body, "body");
    const url = `${BASE_URL}${api}`;
    return await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: body,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .catch(error => console.error(error));
  };
