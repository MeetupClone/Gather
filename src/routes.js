import React from 'react';
import { Switch, Route } from 'react-router-dom';

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

export default (
  <Switch>
  {
  /* <Route component={ AuthHome } exact path="/" />
      <Route component={ NotAuthHome } path="/splash" /> */
}
    <Route component={Home} exact path="/" />
    <Route component={Login} exact path="/login" />
    <Route component={ForgotPassword} exact path="/login/forgotPassword" />
    <Route component={Register} path="/register" />
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
