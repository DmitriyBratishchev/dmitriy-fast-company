import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SelectField from "../../../common/form/selectField";
import AreaField from "../../../common/form/areaField";
import { validator } from "./../../../../utils/validator";

const AddComment = ({ pageId, users, onSubmit }) => {
  const [comment, setComment] = useState({});
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const listUsers = users.map(el => ({ _id: el._id, name: el.name }));

  const validatorConfig = {
    content: {
      isRequired: {}
    }
  };

  useEffect(() => validate(), [comment]);
  useEffect(() => {
    setComment({ userId: listUsers[0]._id, pageId, content: "" });
  }, []);
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
    setComment((prev) => ({ ...prev, content: "" }));
  };
  if (comment.userId) {
    return (
      <div className="card mb-3">
        <div className="card-body ">
          <form onSubmit={handleSubmit}>
            <SelectField
              label="Автор комментария"
              value={comment.userId}
              name="userId"
              onChange={handleChange}
              options={listUsers}
            />
            <AreaField
              rows="3"
              label="Комментарий"
              name="content"
              value={comment.content}
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
  users: PropTypes.array,
  onSubmit: PropTypes.func
};

export default AddComment;
