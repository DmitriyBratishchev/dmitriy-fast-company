import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
// import UserEditPage from "./components/page/userEditPage";
// import UserPage from "./components/page/userPage";
// import UsersListPage from "./components/page/usersListPage";
import NavBar from "./components/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import Login from "./laiout/login";
import LogOut from "./laiout/logout";
import Main from "./laiout/main";
import Users from "./laiout/users";
import { loadProfessions } from "./store/professons";
import { loadQualitiesList } from "./store/qualities";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessions());
  }, []);
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:id?/:edit?" component={ Users } />
          <Route path="/login/:type?" component={ Login } />
          <Route path="/logout" component={ LogOut } />
          <Route path="/" exact component={ Main } />
          <Redirect to="/" />
        </Switch>
      </AuthProvider>
      {/* <Route path="/users/:id/edit" component={UserEditPage} />
      <Route path="/users/:id" exact component={UserPage} />
      <Route path="/users/" component={UsersListPage} />
    <Redirect to="/users/" /> */}
      <ToastContainer />
    </div>
  );
};

export default App;
