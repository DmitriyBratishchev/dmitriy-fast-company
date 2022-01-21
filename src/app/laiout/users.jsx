import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import UsersRouter from "../components/page/usersRouter";
import UsersLoader from "../components/ui/hoc/usersLoader";
// import UserProvider from "../hooks/useUsers";
// import { getDataStatus, loadUsersList } from "../store/users";

const Users = () => {
  // const dispatch = useDispatch();
  // const dataStatus = useSelector(getDataStatus());
  // useEffect(() => {
  //   if (!dataStatus) {
  //     dispatch(loadUsersList());
  //   }
  // }, []);

  // if (!dataStatus) return "Loading ..............";
  return (
    <UsersLoader>
      <UsersRouter />
    </UsersLoader>
  );
};

export default Users;
