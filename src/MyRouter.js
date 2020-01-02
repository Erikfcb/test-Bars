import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Guest from "./Guest";
import Host from "./Host";
import Homepage from "./Homepage";

const MyRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/host" exact component={Host} />
      <Route path="/guest" exact component={Guest} />
    </Switch>
  </Router>
);

export default MyRouter;
