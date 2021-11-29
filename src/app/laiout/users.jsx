import React from "react";
import UsersRouter from "../components/page/usersRouter";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  return (
    <UserProvider>
      <UsersRouter />
    </UserProvider>
  );
};

export default Users;
