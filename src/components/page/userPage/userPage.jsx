import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import QualitiesList from "../../ui/qualites/qualitiesList";
import { useHistory } from "react-router-dom";
import { renderEnding } from "../../../particales/renderPhrase";

const UserPage = ({ match }) => {
  const id = match.params.id;
  const [user, setUser] = useState();
  const history = useHistory();
  useEffect(() => {
    API.users.getById(id).then((res) => setUser(res));
  }, []);

  const handelToUsers = () => {
    history.push(`/users/${id}/edit`);
  };

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <QualitiesList qualities={user.qualities} />
        <h2>
          Встретился {user.completedMeetings} раз
          {renderEnding(user.completedMeetings)}
        </h2>
        <h2>Рэйтинг: {user.rate}</h2>
        <button onClick={() => handelToUsers()}>Изменить</button>
      </>
    );
  } else {
    return <h3>loading...</h3>;
  }
};

UserPage.propTypes = {
  match: PropTypes.object
};

export default UserPage;
