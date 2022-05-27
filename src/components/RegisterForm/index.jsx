import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import Loader from '../Icons/Loader';
import { useActions } from '../../hooks/useActions';
import styles from '../LoginForm/styles.module.css';
function RegisterForm() {
  const { register } = useActions();

  const { isAuth } = useSelector((state) => state.userState);
  const [loader, setLoader] = useState(false);

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    setLoader(true);
    const res = await register(form);

    setLoader(false);
  };

  if (isAuth) {
    <Redirect to={'/profile'} />;
  }

  return (
    <div className={styles.profileForm}>
      <div
        className={classNames(
          styles.profile_form__title,
          'mb-6 text text_type_main-medium'
        )}
      >
        Регистрация
      </div>
      <div className={classNames(styles.profile_form__group, 'mb-6')}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          value={form.name}
          errorText={'Ошибка'}
          onChange={onChange}
        />
      </div>
      <div className={classNames(styles.profile_form__group, 'mb-6')}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          name={'email'}
          value={form.email}
          errorText={'Ошибка'}
          onChange={onChange}
        />
      </div>
      <div className={classNames(styles.profile_form__group, 'mb-6')}>
        <PasswordInput
          placeholder={'Пароль'}
          name={'password'}
          value={form.password}
          onChange={onChange}
        />
      </div>
      <div className={classNames(styles.profile_form__group, 'mb-20')}>
        <Button type="primary" size="medium" onClick={submitForm}>
          {loader ? <Loader /> : 'Зарегистрироваться'}
        </Button>
      </div>
      <div className={classNames(styles.profile_form__group, 'mb-4')}>
        <p
          className={classNames(
            styles.color_text,
            'text text_type_main-default'
          )}
        >
          Уже зарегистрированы?
        </p>
        <Link to="/login" className="color_link">
          Войти
        </Link>
      </div>
    </div>
  );
}
export default RegisterForm;
