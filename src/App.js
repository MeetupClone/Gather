import React, { Component } from 'react';
import './App.css';

import { Link } from "react-router-dom";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to ="/">
            Home
          </Link>
          <Link to ="/login">
            Login
          </Link>
          <Link to ="/user">
            User
          </Link>
          <Link to = "/explore">
            Explore
          </Link>
          <Link to = "/event/create">
            Create Event
          </Link>
        </header>
        <div>{routes}</div>
      </div>
    );
  }
}

export default App;
