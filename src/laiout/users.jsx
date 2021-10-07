import React from "react";
import UsersList from "../components/usersList";
import PropTypes from "prop-types";
import UserPage from "../components/userPage";

const Users = ({ match, history }) => {
  const userId = match.params.id;

  return (
    <>
      {userId ? <UserPage id={userId} history={history} /> : <UsersList />
      }
    </>
  );
};

Users.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Users;
