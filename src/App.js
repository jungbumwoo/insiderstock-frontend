import React from "react";
import { Route, Switch } from "react-router-dom";
import Ban from "./container/Ban/Ban.js";
import GetToken from "../src/container/GetToken/GetToken.js";
import Home from "./container/Home/Home";
import Interest from "./container/Interest/Interest.js";
import Onboard from "../src/container/Onboard/Onboard.js";
import Profile from "./container/Profile/Profile";
import Pagination from "./container/Pagination.js";
import Signin from "../src/container/Signin/Signin.js";
import Signup from "../src/container/Signup/Signup.js";
import Signout from "../src/container/Signout/Signout.js";
import NotInterest from "./container/NotInterest/NotInterest.js";

function App() {
  return (
    <Switch>
      {/* <GlobalStyles /> */}
      <Route exact path="/" component={Home} />
      <Route path="/ban" component={Ban} />
      <Route path="/interest" component={Interest} />
      <Route path="/notinterest" component={NotInterest} />
      <Route path="/onboard" component={Onboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/pagination" component={Pagination} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/signout" component={Signout} />
      <Route path="/token/:token" component={GetToken} />
    </Switch>
  );
}

export default App;
