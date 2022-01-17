import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../store/professons";

const Profession = ({ id }) => {
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  if (!professionsLoading) {
    const profession = professions.find(p => p._id === id);
    return <p>{ profession.name }</p>;
  } else {
    return "loading...";
  }
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
