import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Guest from "./Guest";
import Host from "./Host";
import Hompage from "./Hompage";

const MyRouter = () => (
  <Router>
    <Switch>
      <Route path="/Hompage" component={Hompage} />
      <Route path="/host" component={Host} />
      <Route path="/guest" component={Guest} />
    </Switch>
  </Router>
);

export default MyRouter;
