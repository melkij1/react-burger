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
  forgotPassword: (form: { email: string }) => {
    return async (dispatch: Dispatch<UserAction>): Promise<boolean> => {
      try {
        return post('/password-reset', form).then((res) => {
          if (res.success) {
            dispatch({
              type: ActionUserTypes.SET_FORGOT_PASSWORD,
              payload: true,
            });
            return true;
          }
          return false;
        });
      } catch (e) {
        return false;
      }
    };
  },
  // forgotPassword:
  //   (form: { email: string }) =>
  //   (dispatch: Dispatch<UserAction>): Promise<boolean> => {
  //     return post('/password-reset', form)
  //       .then((res) => {
  //         if (res.success) {
  //           dispatch({
  //             type: ActionUserTypes.SET_FORGOT_PASSWORD,
  //             payload: true,
  //           });
  //           return true;
  //         }
  //         return false;
  //       })
  //       .catch((err) => {
  //         return false;
  //       });
  //   },
  resetPassword: async (form: {
    password: string;
    token: string;
    code: string;
  }): Promise<{ success: boolean }> => {
    return await post('password-reset/reset', form).then(
      (res: any): Promise<{ success: boolean }> => {
        if (res.success) {
          return Promise.resolve({ success: true });
        }
        return Promise.resolve({ success: false });
      }
    );
    // return {
    //     a: true,
    //     b: '123'
    // } // this very well work
  },
  // resetPassword: (form: { password: string; token: string; code: string }) => {
  //   return async (dispatch: Dispatch<UserAction>): Promise<boolean> => {
  //     try {
  //       return post('password-reset/reset', form).then(
  //         (res: any): Promise<boolean> => {
  //           if (res.success) {
  //             return Promise.resolve(true);
  //           }
  //           return Promise.reject(false);
  //         }
  //       );
  //     } catch (e) {
  //       return Promise.reject(false);
  //     }
  //   };
  // },
  // resetPassword:
  //   (form: { password: string; token: string; code: string }) =>
  //   (dispatch: Dispatch<UserAction>): Promise<{ success: boolean }> => {
  //     console.log(form, 'reset');
  //     return post('password-reset/reset', form).then((res: any) => {
  //       if (res.success) {
  //         return { success: true };
  //       }
  //       return { success: false };
  //     });
  //   },
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
    async (dispatch: Dispatch<UserAction>): Promise<boolean> => {
      console.log(form, 'changeUserData');
      if (!Cookies.get('accessToken')) {
        const resToken = await UserActionsCreator.updateToken();
        console.log(resToken, 'getUserInformation res toekn');
      }
      return await patch('/auth/user', form).then((res: any) => {
        if (res.success) {
          dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });
          return true;
        } else {
          return false;
        }
      });
    },
  getUser: () => {
    return get('/auth/user')
      .then((response: any) => {
        console.log(response, 'getUser');
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
    const resposnse = await UserActionsCreator.getUser();
    if (resposnse && resposnse.success) {
      dispatch({ type: ActionUserTypes.SET_USER, payload: resposnse.user });
      return resposnse;
    } else {
      return false;
    }
    // return await UserActionsCreator.getUser()
    //   .then(async (res: any) => {
    //     if (res.success) {
    //       dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });
    //       return res;
    //     }
    //   })
    //   .catch(async (error) => {
    //     console.log(error, 'error');
    //   });
  },
};
