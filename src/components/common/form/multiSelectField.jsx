import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ onChange, options, name, label, value }) => {
  const handleChange = (value) => {
    console.log(value);
    onChange({ name: name, value });
  };
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
        label: options[optionName].name,
        value: options[optionName]._id
      }))
      : options;
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        value={value}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.array
};

export default MultiSelectField;
