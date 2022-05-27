import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useActions } from '../../hooks/useActions';

import Loader from '../Icons/Loader';
import styles from './index.module.css';
function ProfileForm() {
  const { getUserInformation, changeUserData } = useActions();
  const { user, isAuth } = useSelector((state) => state.userState);
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isFocusName, setFocusName] = useState(false);
  const [isFocusEmail, setFocusEmail] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cancelClick = () => {
    setForm({ ...form, name: user.name, email: user.email, password: '' });
  };
  const fetchUse = async () => {
    const res = await getUserInformation();
    if (res.success) {
      setForm({ ...form, name: res.user.name, email: res.user.email });
    }
  };
  const submitForm = async (e) => {
    setLoader(true);
    const response = await changeUserData(form);
    if (response) {
      setLoader(false);
    }
  };

  useEffect(() => {
    // if (isAuth) {
    fetchUse();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!isAuth) {
  //   return <Redirect to={'/login'} />;
  // }

  return (
    <div className={styles.lk_form}>
      <div className="form_group mb-6">
        <Input
          type="text"
          placeholder="Имя"
          onChange={onChange}
          onIconClick={() => setFocusName(true)}
          onBlur={() => setFocusName(false)}
          icon={isFocusName ? '' : 'EditIcon'}
          disabled={!isFocusName}
          value={form.name}
          name="name"
          error={false}
          errorText="Ошибка"
          required
        />
      </div>
      <div className="form_group mb-6">
        <Input
          type="email"
          placeholder="Email"
          onChange={onChange}
          onIconClick={() => setFocusEmail(true)}
          onBlur={() => setFocusEmail(false)}
          icon={isFocusEmail ? '' : 'EditIcon'}
          disabled={!isFocusEmail}
          value={form.email}
          name="email"
          error={false}
          errorText="Ошибка"
          required
        />
      </div>
      <div className="form_group mb-6">
        <Input
          type="password"
          placeholder="Пароль"
          onChange={onChange}
          onIconClick={() => setFocusPassword(true)}
          onBlur={() => setFocusPassword(false)}
          icon={isFocusPassword ? '' : 'EditIcon'}
          disabled={!isFocusPassword}
          value={form.password}
          name="password"
          error={false}
          errorText="Ошибка"
          required
        />
      </div>

      <div className="form_group mb-6">
        <Button type="secondary" size="medium" onClick={cancelClick}>
          Отмена
        </Button>
        <Button type="primary" size="medium" onClick={submitForm}>
          Сохранить {loader ? <Loader /> : null}
        </Button>
      </div>
    </div>
  );
}

export default ProfileForm;
