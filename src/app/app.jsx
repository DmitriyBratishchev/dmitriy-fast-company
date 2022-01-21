import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import AppLoader from "./components/ui/hoc/appLoader";
import NavBar from "./components/ui/navBar";
import Login from "./laiout/login";
import LogOut from "./laiout/logout";
import Main from "./laiout/main";
import Users from "./laiout/users";

const App = () => {
  return (
    <div>
      <AppLoader>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:id?/:edit?" component={ Users } />
          <Route path="/login/:type?" component={ Login } />
          <Route path="/logout" component={ LogOut } />
          <Route path="/" exact component={ Main } />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </div>
  );
};

export default App;
