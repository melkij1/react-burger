import Cookies from 'js-cookie';
import { post, get, patch } from '../../../api';
import { ActionUserTypes, UserAction } from './types';
import { Dispatch } from 'redux';
export const UserActionsCreator = {
  updateToken: async () => {
    const payload = {
      token: Cookies.get('refreshToken'),
    };
    return await post('/auth/token', payload).then((res: any) => {
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
    return await post('/auth/logout', payload).then((res: any) => {
      if (res.success) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return true;
      }
      return false;
    });
  },
  forgotPassword:
    (form: { email: string }) => (dispatch: Dispatch<UserAction>) => {
      // console.log(form, 'forgotPassword');
      return post('/password-reset', form)
        .then((res) => {
          if (res.success) {
            dispatch({
              type: ActionUserTypes.SET_FORGOT_PASSWORD,
              payload: true,
            });
            return true;
          }
        })
        .catch((err) => {
          return false;
        });
    },
  resetPassword:
    (form: { password: string; token: string; code: string }) =>
    (dispatch: Dispatch<UserAction>) => {
      console.log(form, 'reset');
      return post('password-reset/reset', form).then((res: any) => {
        if (res.success) {
          return true;
        }
      });
    },
  register:
    (form: { name: string; email: string; password: string }) =>
    (dispatch: Dispatch<UserAction>) => {
      console.log(form, 'register');
      return post('/auth/register', form).then((res: any) => {
        if (res.success) {
          Cookies.set('accessToken', res.accessToken);
          Cookies.set('refreshToken', res.refreshToken);
          dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });
          return true;
        }
        return false;
      });
    },
  login:
    (form: { email: string; password: string }) =>
    (dispatch: Dispatch<UserAction>) => {
      console.log(form, 'login');
      return post('/auth/login', form).then((res: any) => {
        if (res.success) {
          const time = new Date(new Date().getTime() + 20 * 60 * 1000);
          Cookies.set('accessToken', res.accessToken, {
            expires: time,
          });
          Cookies.set('refreshToken', res.refreshToken);
          dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });
          dispatch({ type: ActionUserTypes.SET_USERAUTH, payload: true });
          return true;
        }
        return false;
      });
    },
  changeUserData:
    (form: { name: string; email: string; password: string }) =>
    async (dispatch: Dispatch<UserAction>) => {
      console.log(form, 'changeUserData');
      if (!Cookies.get('accessToken')) {
        const resToken = await UserActionsCreator.updateToken();
        console.log(resToken, 'getUserInformation res toekn');
      }
      return await patch('/auth/user', form).then((res: any) => {
        if (res.success) {
          dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });

          return true;
        }
      });
    },
  getUser: () => {
    return get('/auth/user')
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  getUserInformation: () => async (dispatch: Dispatch<UserAction>) => {
    if (!Cookies.get('accessToken')) {
      const resToken = await UserActionsCreator.updateToken();
      console.log(resToken, 'getUserInformation res toekn');
    }
    return await UserActionsCreator.getUser()
      .then(async (res: any) => {
        if (res.success) {
          dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });
          return res;
        }
      })
      .catch(async (error) => {
        console.log(error, 'error');
      });
  },
};
