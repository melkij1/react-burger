import Cookies from 'js-cookie';
import { BASE_URL } from '../utils/constans';
export const fetchRequest = async (api) => {
    const url = `${BASE_URL}${api}`;
    return await fetch(url).then(checkResponse);
  },
  fetchPost = async (api, body) => {
    const url = `${BASE_URL}${api}`;
    return await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: body,
      }),
    }).then(checkResponse);
  },
  post = async (api, body, token) => {
    const url = `${BASE_URL}${api}`;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (token !== '') {
      Object.assign(headers, { token });
    }
    console.log(headers);
    // headers.set('authorization', Cookies.get('accessToken'));
    return await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify(body),
    }).then(checkResponse);
  },
  get = async (api) => {
    const url = `${BASE_URL}${api}`;
    const token = Cookies.get('accessToken');
    console.log(token, 'token');
    return await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    }).then(checkResponseGET);
  };

const checkResponse = (res, error) => {
  if (res.ok) {
    return res.json();
  }
  console.log(res, error, 'res');
  return Promise.reject(res.status);
};

const checkResponseGET = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.text().then((text) => Promise.reject(JSON.parse(text)));
};
