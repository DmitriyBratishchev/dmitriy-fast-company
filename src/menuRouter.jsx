import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Login from "./laiout/login";
import Main from "./laiout/main";
import Users from "./laiout/users";

const MenuRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/users/:id?" component={Users} />
      <Redirect to="/" />
    </Switch>
  );
};

export default MenuRouter;
