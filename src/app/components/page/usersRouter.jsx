import React from "react";
import { Redirect, Route, Switch } from "react-router";
import UserPage from "./userPage";
import UserEditPage from "./userEditPage";
import UsersListPage from "./usersListPage";

const UsersRouter = () => {
  return (
    <>
      <Switch>
        <Route path="/users/:id/edit" component={UserEditPage} />
        <Route path="/users/:id" exact component={UserPage} />
        <Route path="/users/" component={ UsersListPage } />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default UsersRouter;
