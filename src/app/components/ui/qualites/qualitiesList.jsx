import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";

const QualitiesList = ({ qualitiesId }) => {
  const { isLoading, getQualities } = useQualities();
  if (!isLoading) {
    const qualities = getQualities(qualitiesId);
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
  } else return "loading...";
};

QualitiesList.propTypes = {
  qualitiesId: PropTypes.array
};

export default QualitiesList;
