import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getQualities, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities";

const QualitiesList = ({ qualitiesId }) => {
  const dispatch = useDispatch();
  const qualities = useSelector(getQualities());
  const isLoadingQualities = useSelector(getQualitiesLoadingStatus());
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  if (!isLoadingQualities) {
    const qualitiesList = qualities.filter(q => qualitiesId.indexOf(q._id) !== -1);
    return (
      <>
        { qualitiesList.map((qualite) => {
          return (
            <span key={ qualite._id } className={ `badge bg-${qualite.color} m-1` }>
              { qualite.name }
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
