import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
  label,
  type,
  name,
  value,
  placeholder,
  error,
  onChange,
  onFocus
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={onFocus}
          className={getInputClasses()}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
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
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

export default TextField;
