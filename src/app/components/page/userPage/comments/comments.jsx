import React from "react";
import PropTypes from "prop-types";
import { AddComment, CommentsList } from ".";
import { useComments } from "../../../../hooks/useComments";

const Comments = () => {
  const { createComment, comments, removeComment } = useComments();

  const handleDelete = (id) => {
    removeComment(id);
  };
  const handleSubmit = (comment) => {
    createComment(comment);
  };

  return (
    <>
      <AddComment
        onSubmit={ handleSubmit }
      />
      <CommentsList
        comments={ comments }
        onDelete={ handleDelete }
      />
    </>
  );
};

Comments.propTypes = {
  match: PropTypes.object
};

export default Comments;
