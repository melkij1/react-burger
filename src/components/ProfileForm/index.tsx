import React, { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useActions } from '../../hooks/useActions';
import { useDispatch } from 'react-redux';
import Loader from '../Icons/Loader';
import styles from './index.module.css';
import { UserActionsCreator } from '../../services/actions/user/user-actions';
declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useTypedSelector((state) => state.userState);
  const [loader, setLoader] = useState<boolean>(false);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: '',
    email: '',
    password: '',
  });
  const [isFocusName, setFocusName] = useState<boolean>(false);
  const [isFocusEmail, setFocusEmail] = useState<boolean>(false);
  const [isFocusPassword, setFocusPassword] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cancelClick = (e: React.ChangeEvent<HTMLElement>) => {
    e.preventDefault();
    setForm({ ...form, name: user.name, email: user.email, password: '' });
  };
  const fetchUse = async () => {
    const res = await UserActionsCreator.getUserInformation()(dispatch);
    console.log(res, 'ress fetch user');
    if (res && res?.success && res?.user) {
      setForm({ ...form, name: res.user.name, email: res.user.email });
    }
  };
  const submitForm = async (e: React.ChangeEvent<HTMLElement>) => {
    e.preventDefault();
    setLoader(true);
    const response = await UserActionsCreator.changeUserData(form)(dispatch);
    if (response) {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.lk_form}>
      <form>
        <div className="form_group mb-6">
          <Input
            type="text"
            placeholder="Имя"
            onChange={onChange}
            onIconClick={() => setFocusName(true)}
            onBlur={() => setFocusName(false)}
            icon={isFocusName ? 'CloseIcon' : 'EditIcon'}
            disabled={!isFocusName}
            value={form.name}
            name="name"
            error={false}
            errorText="Ошибка"
          />
        </div>
        <div className="form_group mb-6">
          <Input
            type="email"
            placeholder="Email"
            onChange={onChange}
            onIconClick={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
            icon={isFocusEmail ? 'CloseIcon' : 'EditIcon'}
            disabled={!isFocusEmail}
            value={form.email}
            name="email"
            error={false}
            errorText="Ошибка"
          />
        </div>
        <div className="form_group mb-6">
          <Input
            type="password"
            placeholder="Пароль"
            onChange={onChange}
            onIconClick={() => setFocusPassword(true)}
            onBlur={() => setFocusPassword(false)}
            icon={isFocusPassword ? 'CloseIcon' : 'EditIcon'}
            disabled={!isFocusPassword}
            value={form.password}
            name="password"
            error={false}
            errorText="Ошибка"
          />
        </div>

        <div className="form_group mb-6">
          <Button type="secondary" size="medium" onClick={() => cancelClick}>
            Отмена
          </Button>
          <Button type="primary" size="medium" onClick={() => submitForm}>
            Сохранить {loader ? <Loader /> : null}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
