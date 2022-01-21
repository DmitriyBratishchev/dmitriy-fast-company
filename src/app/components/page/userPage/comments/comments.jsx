import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AddComment, CommentsList } from ".";
// import { useComments } from "../../../../hooks/useComments";
import { createComment, getComments, getCommentsLoadingStatus, loadComments, removeComment } from "../../../../store/comments";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id: pageId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(getComments());
  const isLoading = useSelector(getCommentsLoadingStatus());
  // const createComment = useSelector()
  // const { removeComment } = useComments();
  // console.log(comments);

  useEffect(() => dispatch(loadComments(pageId)), [pageId]);
  const handleDelete = (id) => {
    dispatch(removeComment(id));
  };
  const handleSubmit = (comment) => {
    dispatch(createComment({ ...comment, pageId }));
  };
  // console.log("state in comments", state);
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
