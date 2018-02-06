import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/login/login';
import ForgotPassword from './components/login/forgotPassword/forgotPassword';
import Register from './components/login/register/register';
import User from './components/user/profile/user.js';

import Explore from './components/events/explore/explore';
import CreateEvents from './components/events/createEvents/createEvents';
import EditEvent from './components/events/editEvent/editEvent';
import SingleEvent from './components/events/singleEvent/singleEvent';
import CreateGroup from './components/groups/createGroup/createGroup';
import GroupPage from './components/groups/groupPage/groupPage';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import Account from './components/user/account/account';
import FAQ from './components/info_faq/faq';

let redirect = () => {
  return <Redirect to="/" />;
};

export const Routes = uid => {
  console.log(uid);
  return (
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={!uid ? Login : redirect} exact path="/login" />
      <Route
        component={!uid ? ForgotPassword : redirect}
        exact
        path="/login/forgotPassword"
      />
      <Route component={!uid ? Register : redirect} path="/register" />
      <Route component={User} exact path="/user" />
      <Route component={Explore} path="/explore" />
      <Route component={CreateEvents} exact path="/event/create" />
      <Route component={EditEvent} path="/event/edit/:id" />
      <Route component={SingleEvent} exact path="/event/:id" />
      <Route component={CreateGroup} path="/groups/create" />
      <Route component={GroupPage} path="/groups/:id" />
      <Route component={Account} exact path="/user/account" />
      <Route component={FAQ} path="/faq" />
      <Route component={Footer} path="/" />
    </Switch>
  );
};
