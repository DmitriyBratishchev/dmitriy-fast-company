import React from "react";
import { useProfession } from "../../hooks/useProfession";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
  // console.log("pofession id", id);

  const { isLoading, getProfession } = useProfession();
  if (!isLoading) {
    const profession = getProfession(id);
    return <p>{profession.name}</p>;
  } else {
    return "loading...";
  }
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
