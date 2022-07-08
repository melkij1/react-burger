import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import Loader from '../Icons/Loader';
import { UserActionsCreator } from '../../services/actions/user/user-actions';
import styles from '../LoginForm/styles.module.css';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}
//Для ревьюера на данной странице мне нужен диспатч, иначе с экшенов не вернется калбэк.
function RegisterForm() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<boolean>(false);

  const [form, setValue] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: '', email: '', password: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    await UserActionsCreator.register(form)(dispatch);

    setLoader(false);
  };

  if (Cookies.get('accessToken')) {
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
      <form onSubmit={submitForm}>
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
            name={'password'}
            value={form.password}
            onChange={onChange}
          />
        </div>
        <div className={classNames(styles.profile_form__group, 'mb-20')}>
          <Button type="primary" size="medium">
            {loader ? <Loader /> : 'Зарегистрироваться'}
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
