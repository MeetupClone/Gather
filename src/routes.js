import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from "./components/login/login";
import Home from "./components/home/home";
import Register from "./components/login/register/register";

export default (
    <Switch>
    <Route component={ Home } exact path="/" />
    <Route component={ Login } path="/login" /> 
    <Route component={ Register} path="/register" />
  </Switch>
)