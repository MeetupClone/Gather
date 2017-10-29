import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from "./components/login/login";
import Home from "./components/home/home";
import Register from "./components/login/register/register";
import User from "./components/user/user";
import Explore from "./components/events/explore/explore";
import CreateEvents from './components/events/createEvents/createEvents';
import SingleEvent from './components/events/singleEvent/singleEvent';

export default (
    <Switch>
    <Route component={ Home } exact path="/" />
    <Route component={ Login } path="/login" /> 
    <Route component={Register} path = "/register" />
    <Route component={ User } path="/user" />
    <Route component={ Explore } path="/events"/>
    <Route component={ SingleEvent } exact path="/events/:id"/>
    <Route component={ CreateEvents} exact path="/events/"/>
    </Switch>
)