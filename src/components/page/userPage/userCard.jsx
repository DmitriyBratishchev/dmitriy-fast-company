import React from "react";
import PropTypes from "prop-types";
import QualitiesList, { RandomAvatar } from "../../ui/qualites";
import { renderEnding } from "../../../particales/renderPhrase";

const UserCard = ({ name, profession, rate, qualities, completedMeetings, onClickSettings }) => {
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={onClickSettings}>
            <i className="bi bi-gear"></i>
          </button>
          <div className="d-flex flex-column align-items-center text-center position-relative">
            <RandomAvatar />
            <div className="mt-3">
              <h4>{name}</h4>
              <p className="text-secondary mb-1">{profession}</p>
              <div className="text-muted">
                <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                <i className="bi bi-caret-up text-secondary" role="button"></i>
                <span className="ms-2">{rate}</span>
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
            <QualitiesList qualities={qualities} />
          </p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Встретился</span>
          </h5>

          <h1 className="display-1">{completedMeetings}</h1>
          <h5 className="card-title">
            <span>раз{renderEnding(completedMeetings)}</span>
          </h5>
        </div>
      </div>
    </>
  );
};

UserCard.propTypes = {
  name: PropTypes.string,
  profession: PropTypes.string,
  qualities: PropTypes.array,
  rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  completedMeetings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClickSettings: PropTypes.func
};

export default UserCard;
