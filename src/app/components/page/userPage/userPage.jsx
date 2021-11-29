import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import { useHistory } from "react-router-dom";
import UserCard from "./userCard";
import Comments from "./comments";

const UserPage = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(id).then((res) => setUser(res));
  }, []);

  const handelToUserEdit = () => {
    history.push(`/users/${id}/edit`);
  };

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard
              name={user.name}
              profession={user.profession.name}
              qualities={user.qualities}
              completedMeetings={user.completedMeetings}
              onClickSettings={handelToUserEdit}
            />
          </div>
          <div className="col-md-8">
            <Comments pageId={user._id} />
          </div>
        </div>
      </div >
    );
  } else {
    return <h3>loading...</h3>;
  }
};

UserPage.propTypes = {
  match: PropTypes.object
};

export default UserPage;
