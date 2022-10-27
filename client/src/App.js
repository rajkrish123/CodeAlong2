import { Component } from "react";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Home from "./components/Home.js";
import JoinRoom from "./components/JoinRoom.js";
import RoomNotFound from "./components/RoomNotFound";
import history from "./history";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/room/:id" exact component={JoinRoom} />
          <Route path="/room-not-found" exact component={RoomNotFound} />
        </Switch>
      </Router>
    );
  }
}
