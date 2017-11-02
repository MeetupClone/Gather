import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from "./components/login/login";
import Register from "./components/login/register/register";
import User from "./components/user/user";
import EditableProfile from "./components/user/editableProfile/editableProfile";


import Explore from "./components/events/explore/explore";
import CreateEvents from './components/events/createEvents/createEvents';
import SingleEvent from './components/events/singleEvent/singleEvent';
import CreateGroup from './components/groups/createGroup/createGroup';
import GroupPage from './components/groups/groupPage/groupPage';
import AuthHome from './components/home/authHome/authHome';
// change default home route to these ^ w logic
import NotAuthHome from './components/home/notAuthHome/notAuthHome';
import Home from './components/home/home'
import Account from './components/user/account/account';
import PushNotifications from "./components/pushNotifications/pushNotification"

export default (
    <Switch>
      {/* <Route component={ AuthHome } exact path="/" />
      <Route component={ NotAuthHome } path="/splash" /> */}
      <Route component={ Home } exact path="/"/>
      <Route component={ Login } path="/login" />
      <Route component={ Register } path = "/register" />
      <Route component={ User } path="/user" />
      <Route component={ Explore } path="/explore"/>
      <Route component={ CreateEvents} exact path="/event/create"/>
      <Route component={ SingleEvent } exact path="/event/:id"/>
      <Route component={ CreateGroup } path ="/groups/creat"/>
      <Route component={ GroupPage } path ="/groups/:id"/>
      <Route component={ Account } exact path ="/user/account"/>
      <Route component={ PushNotifications } path="/pushNotifications"/>
  </Switch>

)
