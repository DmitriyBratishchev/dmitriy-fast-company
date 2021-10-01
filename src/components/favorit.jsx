import React from "react";
import PropTypes from "prop-types";

const Favorit = ({ handleFavorit, user }) => {
  return (
    <>
      <i
        onClick={() => handleFavorit(user._id)}
        className={
          user.favorit ? "bi bi-bookmark-fill text-success" : "bi bi-bookmark"
        }
      ></i>
    </>
  );
};

Favorit.propTypes = {
  user: PropTypes.object.isRequired,
  handleFavorit: PropTypes.func.isRequired
};

export default Favorit;
