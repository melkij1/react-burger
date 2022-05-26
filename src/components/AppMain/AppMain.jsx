import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import ForgotPassword from '../../pages/ForgotPassword';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import Register from '../../pages/Register';
import ResetPassword from '../../pages/ResetPassword';
import Ingredients from '../../pages/ingredients';
import ProfileForm from '../../components/ProfileForm';
function AppMain() {
  return (
    <main>
      <Switch>
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
        <Route exact path="/profile">
          <Profile>
            <ProfileForm/>
          </Profile>
        </Route>
        <Route exact path="/ingredients/:od">
          <Ingredients />
        </Route>
        {/*<Route exact path='/logout'>*/}
        {/*    <Profile/>*/}
        {/*</Route>*/}
        {/*<Route exact path='/profile'>*/}
        {/*    <Profile/>*/}
        {/*</Route>*/}
      </Switch>
    </main>
  );
}
export default AppMain;
