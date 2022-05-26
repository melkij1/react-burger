import React, { useState } from 'react';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../LoginForm/styles.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
function RegisterForm() {
  const { forgotPassword } = useActions();
  const [form, setValue] = useState({ email: '' });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    const res = await forgotPassword(form);
    console.log(res, 'submit');
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
          type={'email'}
          placeholder={'Укажите e-mail'}
          name={'email'}
          errorText={'Ошибка'}
          onChange={onChange}
        />
      </div>
      <div className={classNames(styles.profile_form__group, 'mb-20')}>
        <Button type="primary" size="medium" onClick={submitForm}>
          Восстановить
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
export default RegisterForm;
