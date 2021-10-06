import React from "react";
import UsersList from "../usersList";
import PropTypes from "prop-types";
import User from "../user";

const Users = ({ match, history }) => {
  const userId = match.params.id;

  return (
    <>
      {userId ? <User id={userId} history={history} /> : <UsersList />
      }
    </>
  );
};

Users.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Users;
