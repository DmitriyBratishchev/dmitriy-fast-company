import React from "react";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qualite) => {
        return (
          <span key={qualite._id} className={`badge bg-${qualite.color} m-1`}>
            {qualite.name}
          </span>
        );
      })}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
