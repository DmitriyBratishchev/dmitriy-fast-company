import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
  return (
    <UsersLoader>
      <Switch>
        <Route path="/users/:id/edit" component={ UserEditPage } />
        <Route path="/users/:id" exact component={ UserPage } />
        <Route path="/users/" component={ UsersListPage } />
        <Redirect to="/" />
      </Switch>
    </UsersLoader>
  );
};

export default Users;
