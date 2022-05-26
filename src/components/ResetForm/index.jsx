import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../LoginForm/styles.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
function ResetForm() {
  const { resetPassword } = useActions();
  const [form, setValue] = useState({ password: '', token: '', code: '' });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    const token = Cookies.get('token');
    if (form.code !== '') {
      setValue({ ...form, token });
      const res = await resetPassword(form);
      console.log(res, 'submit');
    }
  };
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
      <div className={classNames(styles.profile_form__group, 'mb-6')}>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          name={'passowrd'}
          icon={'ShowIcon'}
          onChange={onChange}
        />
      </div>
      <div className={classNames(styles.profile_form__group, 'mb-6')}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'code'}
          onChange={onChange}
        />
      </div>
      <div className={classNames(styles.profile_form__group, 'mb-20')}>
        <Button type="primary" size="medium" onClick={submitForm}>
          Сохранить
        </Button>
      </div>
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
