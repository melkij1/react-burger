import Cookies from 'js-cookie';
import { ingredientType } from '../types';
import { BASE_URL } from '../utils/constans';

interface ICheckResponse {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): Response;
  text(): Promise<string>;
  success?: boolean;
  name?: string;
  order?: {
    number: number;
  };
}

interface IRequest extends ICheckResponse {
  data?: ingredientType[];
}

export const fetchRequest = async (api: string): Promise<IRequest> => {
    const url = `${BASE_URL}${api}`;
    return await fetch(url).then(checkResponse);
  },
  fetchPost = async (api: string, body: any): Promise<ICheckResponse> => {
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
  post = async (
    api: string,
    body?: any,
    token?: string
  ): Promise<ICheckResponse> => {
    const url = `${BASE_URL}${api}`;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (token !== '') {
      Object.assign(headers, { authorization: token });
    }
    return await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify(body),
    }).then(checkResponse);
  },
  get = async (api: string): Promise<ICheckResponse> => {
    const url = `${BASE_URL}${api}`;
    const token = Cookies.get('accessToken') || null;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (token !== '') {
      Object.assign(headers, { authorization: token });
    }
    return await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers,
    }).then(checkResponseGET);
  },
  patch = async (api: string, body: any): Promise<ICheckResponse> => {
    const url = `${BASE_URL}${api}`;
    const token = Cookies.get('accessToken');
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (token !== '') {
      Object.assign(headers, { authorization: token });
    }
    return await fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify(body),
    }).then(checkResponse);
  };

const checkResponse = (res: {
  ok?: boolean;
  json: () => Promise<ICheckResponse>;
  status: any;
}) => {
  console.log(res, 'ress', JSON.stringify(res));
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.status);
};

const checkResponseGET = (res: {
  ok?: boolean;
  json: () => Promise<ICheckResponse>;
  text(): Promise<string>;
  status: any;
}) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.text().then((text) => JSON.parse(text)));
};
