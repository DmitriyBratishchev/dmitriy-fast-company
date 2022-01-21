import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "../../ui/qualites";
import { renderEnding } from "../../../particales/renderPhrase";
import { useHistory } from "react-router-dom";
import Profession from "../../ui/profession";
import Avatar from "../../ui/avatar";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";

const UserCard = ({ user }) => {
  const history = useHistory();
  const currentUserId = useSelector(getCurrentUserId());

  const handelToUserEdit = () => {
    history.push(`/users/${user._id}/edit`);
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          { user._id === currentUserId && <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={ handelToUserEdit }>
            <i className="bi bi-gear"></i>
          </button> }
          <div className="d-flex flex-column align-items-center text-center position-relative">
            <Avatar imageLink={ user.image } />
            <div className="mt-3">
              <h4>{ user.name }</h4>
              <Profession id={ user.profession } />
              <div className="text-muted">
                <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                <i className="bi bi-caret-up text-secondary" role="button"></i>
                <span className="ms-2">{ user.rate }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Качества</span>
          </h5>
          <p className="card-text">
            <QualitiesList qualitiesId={ user.qualities } />
          </p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Встретился</span>
          </h5>

          <h1 className="display-1">{ user.completedMeetings }</h1>
          <h5 className="card-title">
            <span>раз{ renderEnding(user.completedMeetings) }</span>
          </h5>
        </div>
      </div>
    </>
  );
};

UserCard.propTypes = {
  user: PropTypes.object
};

export default UserCard;
