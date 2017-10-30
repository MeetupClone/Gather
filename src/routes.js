import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from "./components/login/login";
import Home from "./components/home/home";
import Register from "./components/login/register/register";
import User from "./components/user/user";
import Explore from "./components/events/explore/explore";
import CreateEvents from './components/events/createEvents/createEvents';
import SingleEvent from './components/events/singleEvent/singleEvent';
import CreateGroup from './components/groups/createGroup';
import GroupPage from './components/groups/groupPage';
import AuthHome from './components/groups/home/authHome';
// change default home route to these ^ w logic
import NotAuthHome from './components/groups/home/notAuthHome';
import Account from './components/groups/user/account'

export default (
    <Switch>
      
    <Route component={ Home } exact path="/" />
    <Route component={ Login } path="/login" /> 
    <Route component={Register} path = "/register" />
    <Route component={ User } path="/user" />
    <Route component={ Explore } path="/explore"/>
    <Route component={ SingleEvent } exact path="/event/:id"/>
    <Route component={ CreateEvents} exact path="/event/create"/>
    <Route component={ CreateGroup } path ="/groups/creat"/>
    <Route component={ GroupPage } path ="/groups/:id"/>
    <Route component={ Account } exact path ="/user/account"/>

    </Switch>
)