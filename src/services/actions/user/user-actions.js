import Cookies from 'js-cookie';
import { post, get, patch } from '../../../api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const SET_USER = 'SET_USER';
export const SET_USERAUTH = 'SET_USERAUTH';
export const SET_FORGOT_PASSWORD = 'SET_FORGOT_PASSWORD';

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

    return await post('/auth/token', payload).then((res) => {
      if (res.success) {
        const time = new Date(new Date().getTime() + 20 * 60 * 1000);
        Cookies.set('accessToken', res.accessToken, {
          expires: time,
        });
        Cookies.set('refreshToken', res.refreshToken);
        return true;
      }
      return false;
    });
  },
  logoutUser: async () => {
    const payload = {
      token: Cookies.get('refreshToken'),
    };
    return await post('/auth/logout', payload).then((res) => {
      if (res.success) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return true;
      }
      return false;
    });
  },
  forgotPassword: (form) => (dispatch) => {
    return post('/password-reset', form).then((res) => {
      if (res.success) {
        dispatch({ type: SET_FORGOT_PASSWORD, payload: true });
        return true;
      }
    });
  },
  resetPassword: (form) => (dispatch) => {
    return post('password-reset/reset', form).then((res) => {
      if (res.success) {
        return true;
      }
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
        const time = new Date(new Date().getTime() + 20 * 60 * 1000);
        Cookies.set('accessToken', res.accessToken, {
          expires: time,
        });
        Cookies.set('refreshToken', res.refreshToken);
        dispatch({ type: SET_USER, payload: res.user });
        dispatch({ type: SET_USERAUTH, payload: true });
        return true;
      }
      return false;
    });
  },
  changeUserData: (form) => async (dispatch) => {
    if (!Cookies.get('accessToken')) {
      const resToken = await UserActionsCreator.updateToken();
      console.log(resToken, 'getUserInformation res toekn');
    }
    return await patch('/auth/user', form).then((res) => {
      if (res.success) {
        dispatch({ type: SET_USER, payload: res.user });

        return true;
      }
    });
  },
  getUser: () => {
    return get('/auth/user')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  getUserInformation: () => async (dispatch) => {
    if (!Cookies.get('accessToken')) {
      const resToken = await UserActionsCreator.updateToken();
      console.log(resToken, 'getUserInformation res toekn');
    }
    return await UserActionsCreator.getUser()
      .then(async (res) => {
        if (res.success) {
          dispatch({ type: SET_USER, payload: res.user });
          return res;
        }
      })
      .catch(async (error) => {
        console.log(error, 'error');
      });
  },
};
