import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
  const { logOut } = useAuth();
  console.log("logout");
  useEffect(() => {
    logOut();
  }, []);
  return (<h1>Loading</h1>);
};

export default LogOut;
