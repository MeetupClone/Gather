import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from "./components/login/login";
import Home from "./components/home/home";
import Register from "./components/login/register/register";
import User from "./components/user/user";
import PushNotifications from "./components/pushNotifications/pushNotification"

export default (
    <Switch>
    <Route component={ Home } exact path="/" />
    <Route component={ Login } path="/login" /> 
    <Route component={ Register } path = "/register" />
    <Route component={ User } path="/user" />
    <Route component={ PushNotifications } path="/pushNotifications"/>
  </Switch>
)