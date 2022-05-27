import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../LoginForm/styles.module.css';
import classNames from 'classnames';
import { useActions } from '../../hooks/useActions';
function ResetForm() {
  const location = useLocation();
  const history = useHistory();
  const { resetPassword } = useActions();
  const { user } = useSelector((state) => state.userState);
  const [form, setValue] = useState({ password: '', token: '', code: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (form.code !== '') {
      setValue({ ...form, token });
      const res = await resetPassword(form);
      if (res) {
        history.push('/login');
      }
    }
  };

  if (user) {
    return <Redirect to={'/'} />;
  }
  if (
    !location.state ||
    (location.state && location.state.from.pathname !== '/forgot-password')
  ) {
    return <Redirect to={'/forgot-password'} />;
  }
  return (
    <div className={styles.profileForm}>
      <div
        className={classNames(
          styles.profile_form__title,
          'mb-6 text text_type_main-medium'
        )}
      >
        Восстановление пароля
      </div>
      <form onSubmit={submitForm}>
        <div className={classNames(styles.profile_form__group, 'mb-6')}>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            name={'passowrd'}
            value={form.password}
            icon={'ShowIcon'}
            onChange={onChange}
          />
        </div>
        <div className={classNames(styles.profile_form__group, 'mb-6')}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            name={'code'}
            value={form.code}
            onChange={onChange}
          />
        </div>
        <div className={classNames(styles.profile_form__group, 'mb-20')}>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <div className={classNames(styles.profile_form__group, 'mb-4')}>
        <p
          className={classNames(
            styles.color_text,
            'text text_type_main-default'
          )}
        >
          Вспомнили пароль?
        </p>
        <Link to="/login" className="color_link">
          Войти
        </Link>
      </div>
    </div>
  );
}
export default ResetForm;
