import React, { useCallback, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import HomePage from '../../pages/HomePage';
import ProtectedRoute from '../../components/ProtectedRoute';
import ForgotPassword from '../../pages/ForgotPassword';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import Register from '../../pages/Register';
import ResetPassword from '../../pages/ResetPassword';
import IngredientsDetails from '../../components/IngredientDetails/IngredientDetails';
import ProfileForm from '../../components/ProfileForm';
import Modal from '../../components/Modal/Modal';
function AppMain() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { getIngredients, closeModalAction } = useActions();

  let background = location.state;

  if (location.state) {
    background = location.state.background;
  }

  if (history.action !== 'PUSH') {
    background = undefined;
  }

  const closeModalIgredient = () => {
    background = undefined;
    closeModalAction();
    history.push('/');
  };
  const fetchData = useCallback(async () => {
    await getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
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
        {/*<Route exact path='/feed'>*/}
        {/*    <Login/>*/}
        {/*</Route>*/}

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
        {/*<Route exact path='/profile'>*/}
        {/*    <Profile/>*/}
        {/*</Route>*/}
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
