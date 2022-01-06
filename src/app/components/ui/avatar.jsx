import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ imageLink, width = "65" }) => {
  return (
    <img
      src={ imageLink || `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .slice(-5)}.svg` }
      className="rounded-circle shadow-1-strong me-3"
      alt="avatar"
      width={ width }
    />
  );
};

Avatar.propTypes = {
  imageLink: PropTypes.string,
  width: PropTypes.string
};

export default Avatar;
