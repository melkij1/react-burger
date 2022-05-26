import Cookies from 'js-cookie';
import { post, get } from '../../../api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const SET_USER = 'SET_USER';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const UserActionsCreator = {
  updateToken: async () => {
    const payload = {
      token: Cookies.get('refreshToken'),
    };
    const token = Cookies.get('accessToken');
    const res = await post('/auth/token', payload, token);
    if (res.success) {
      console.log(res, 'updateToken');
      return true;
    } else {
      return false;
    }
  },
  forgotPassword: (form) => (dispatch) => {
    post('/password-reset', form).then((res) => {
      console.log(res, 'forgotPassword');
    });
  },
  resetPassword: (form) => (dispatch) => {
    post('password-reset/reset', form).then((res) => {
      console.log(res, 'forgotPassword');
    });
  },
  register: (form) => (dispatch) => {
    return post('/auth/register', form).then((res) => {
      if (res.success) {
        Cookies.set('accessToken', res.accessToken);
        Cookies.set('refreshToken', res.refreshToken);
        dispatch({ type: SET_USER, payload: res.user });
        return true;
      }
      return false;
    });
  },
  login: (form) => (dispatch) => {
    return post('/auth/login', form).then((res) => {
      if (res.success) {
        Cookies.set('accessToken', res.accessToken);
        Cookies.set('refreshToken', res.refreshToken);
        dispatch({ type: SET_USER, payload: res.user });
        return true;
      }
      return false;
    });
  },
  getUser: () => (dispatch) => {
    return get('/auth/user')
      .then((res) => {
        if (res.success) {
          dispatch({ type: SET_USER, payload: res.user });
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  },
  getUserInformation: () => async (dispatch) => {
    const response = await UserActionsCreator.getUser();
    if (!response.success) {
      const resToken = await UserActionsCreator.updateToken();
      console.log(resToken, 'getUserInformation res');
      const res = await UserActionsCreator.getUser();
      if (res) {
        console.log(res, 'update token');
        return res;
      }
      // dispatch({ type: SET_USER, payload: response.user });
      // console.log(response, 'getUserInformation success');
      // return response.user;
    } else {
      return response.user;
    }

    // .then((res) => {
    //   return res;
    // })
    // .catch(async (err) => {
    //   if (err.message === 'jwt expired') {
    //     const res = await UserActionsCreator.updateToken();
    //     if (res) {
    //       console.log(res, 'token');
    //     }
    //   }
    // });
  },
};
