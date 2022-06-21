import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import HomePage from '../../pages/HomePage';
import ProtectedRoute from '../ProtectedRoute';
import ForgotPassword from '../../pages/ForgotPassword';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import Register from '../../pages/Register';
import ResetPassword from '../../pages/ResetPassword';
import IngredientsDetails from '../IngredientDetails/IngredientDetails';
import ProfileForm from '../ProfileForm';
import Modal from '../Modal/Modal';
import { Location } from 'history';

function AppMain() {
  const location = useLocation<{ background: Location }>();
  const history = useHistory();
  const { closeModalAction } = useActions();
  const action = history.action !== 'PUSH';
  // let background = location.state;
  let background = action && location.state && location.state.background;

  // if (location.state) {
  //   background = location?.state?.background;
  //   console.log(background);
  // }

  // if (history.action !== 'PUSH') {
  //   background = undefined;
  // }

  const closeModalIgredient = () => {
    background = false;
    closeModalAction();
    history.push('/');
  };
  return (
    <main>
      <Switch location={background || location}>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile">
          <Profile>
            <ProfileForm />
          </Profile>
        </ProtectedRoute>
        <Route exact path="/ingredients/:id">
          <IngredientsDetails />
        </Route>
        <Route exact path="/logout">
          <Profile />
        </Route>
      </Switch>
      {background && (
        <Route path={'/ingredients/:id'}>
          <Modal show={true} onClose={() => closeModalIgredient()}>
            <IngredientsDetails />
          </Modal>
        </Route>
      )}
    </main>
  );
}
export default AppMain;
