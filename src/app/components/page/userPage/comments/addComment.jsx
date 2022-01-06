import React, { useState } from "react";
import PropTypes from "prop-types";
import AreaField from "../../../common/form/areaField";
import { validator } from "../../../../utils/validator";

const AddComment = ({ onSubmit }) => {
  const [comment, setComment] = useState({});
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const validatorConfig = {
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым."
      }
    }
  };

  const handleChange = (target) => {
    setComment((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validate = () => {
    const errors = validator(comment, validatorConfig);
    setErrors(errors);
    return isValid;
  };
  const handleSubmit = () => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(comment);
    setComment({});
  };
  if (comment) {
    return (
      <div className="card mb-3">
        <div className="card-body ">
          <form onSubmit={ handleSubmit }>
            <AreaField
              rows="3"
              label="Комментарий"
              name="content"
              value={ comment.content || "" }
              onChange={handleChange}
              error={errors.content}
            />
            <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">Отпрвить</button>
          </form>
        </div>
      </div>
    );
  };
  return <p>loading</p>;
};

AddComment.propTypes = {
  pageId: PropTypes.string,
  onSubmit: PropTypes.func
};

export default AddComment;
