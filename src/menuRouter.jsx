import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Login from "./laiout/login";
import Main from "./laiout/main";
import Users from "./laiout/users";

const MenuRouter = () => {
  return (
    <Switch>
      <Route path="/users/:id?" component={Users} />
      <Route path="/login/:type?" component={Login} />
      <Route path="/" exact component={Main} />
      <Redirect to="/" />
    </Switch>
  );
};

export default MenuRouter;
