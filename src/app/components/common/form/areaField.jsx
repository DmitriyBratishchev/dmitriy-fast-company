import React from "react";
import PropTypes from "prop-types";

const AreaField = ({
  label,
  name,
  value,
  rows,
  error,
  onChange
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <div className="input-group has-validation">
        <textarea
          id={name}
          name={name}
          value={value}
          rows={rows}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

AreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  rows: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
};

export default AreaField;
