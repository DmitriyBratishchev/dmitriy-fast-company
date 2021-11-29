import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, options, name, onChange, value }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
        name: options[optionName].name,
        value: options[optionName].value
      }))
      : options;
  return (
    <div className="mb-4">
      <div>
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      </div>
      {optionsArray &&
        optionsArray.map((option) => (
          <div
            key={option.name + "_" + option.value}
            className="form-check form-check-inline"
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={option.name + "_" + option.value}
              value={option.value}
              onChange={handleChange}
              checked={option.value === value}
            />
            <label
              className="form-check-label"
              htmlFor={option.name + "_" + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
    </div>
  );
};

RadioField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default RadioField;
