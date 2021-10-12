import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, placeholder, onChange, onFocus }) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
};

TextField.defaultProps = {
  type: "text"
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

export default TextField;
