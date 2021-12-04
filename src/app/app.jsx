import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
// import UserEditPage from "./components/page/userEditPage";
// import UserPage from "./components/page/userPage";
// import UsersListPage from "./components/page/usersListPage";
import NavBar from "./components/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQuality";
import Login from "./laiout/login";
import Main from "./laiout/main";
import Users from "./laiout/users";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <Route path="/users/:id?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </QualitiesProvider>
        </ProfessionProvider>
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
