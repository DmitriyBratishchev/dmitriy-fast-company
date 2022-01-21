import React from "react";
import PropTypes from "prop-types";
import UserCard from "./userCard";
import Comments from "./comments";
import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ match }) => {
  const id = match.params.id;
  const user = useSelector(getUserById(id));

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard
              user={ user }
            />
          </div>
          <div className="col-md-8">
            <CommentsProvider >
              <Comments />
            </CommentsProvider>
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
