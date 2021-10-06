import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../api";
import QualitiesList from "./qualitiesList";

const User = ({ id, history }) => {
  console.log("id", id);
  const [user, setUser] = useState();

  useEffect(() => {
    API.users.getById(id).then((res) => setUser(res));
  }, []);

  const handelToUsers = () => {
    history.push("/users");
  };

  console.log("user", user);
  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <QualitiesList qualities={user.qualities} />
        <h2>Встретился {user.completedMeetings} раз</h2>
        <h2>Рэйтинг: {user.rate}</h2>
        <button onClick={() => handelToUsers()}>Все Пользователи</button>
      </>
    );
  } else {
    return <h3>loading...</h3>;
  }
};

User.propTypes = {
  id: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default User;
