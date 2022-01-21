import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AddComment, CommentsList } from ".";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadComments,
  removeComment
} from "../../../../store/comments";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id: pageId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(getComments());
  const isLoading = useSelector(getCommentsLoadingStatus());

  useEffect(() => dispatch(loadComments(pageId)), [pageId]);

  const handleDelete = (id) => {
    dispatch(removeComment(id));
  };
  const handleSubmit = (comment) => {
    dispatch(createComment({ ...comment, pageId }));
  };
  return (
    <>
      <AddComment
        onSubmit={ handleSubmit }
      />
      { isLoading && <h3>Loading . . . . .</h3> }
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
