import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useActions } from '../../hooks/useActions';
import styles from './index.module.css';
function ProfileForm() {
  const { getUserInformation } = useActions();
  const { user } = useSelector((state) => state.userState);
  const [form, setForm] = useState({
    name: 'Марк',
    email: 'mail@stellar.burgers',
    password: '123123123',
  });
  const [isFocusName, setFocusName] = useState(false);
  const [isFocusEmail, setFocusEmail] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const fetchUse = async () => {
    const res = await getUserInformation();
    console.log(res, 'rrr');
    if (user) {
      console.log(res, 'effect');
      setForm({ ...form, name: user.name, email: user.email });
    }
  };
  useEffect(() => {
    fetchUse();
    // const res = getUserInformation();
    // console.log(res, 'effect');
    // if (user) {
    //   setForm({ ...form, name: user.name, email: user.email });
    // }
  }, []);
  return (
    <div className={styles.lk_form}>
      <form action="#">
        <div className="form_group mb-6">
          <Input
            type="text"
            placeholder="Имя"
            onChange={onChange}
            icon="EditIcon"
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
            icon="EditIcon"
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
            icon="EditIcon"
            value={form.password}
            name="password"
            error={false}
            errorText="Ошибка"
            required
          />
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
