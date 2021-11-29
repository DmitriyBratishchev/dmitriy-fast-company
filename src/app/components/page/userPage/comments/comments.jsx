import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../../../api";
import { AddComment, CommentsList } from ".";

const Comments = ({ pageId }) => {
  const [users, setUsers] = useState();
  const [comments, useComments] = useState();
  const getComments = () => {
    API.comments.fetchCommentsForUser(pageId).then(res => useComments(res));
  };
  useEffect(() => {
    getComments();
  }, []);

  const handleDelete = (id) => {
    API.comments.remove(id).then(() => getComments());
  };
  useEffect(() => {
    API.users.fetchAll().then(res => setUsers(res));
  }, []);
  const handleSubmit = (comment) => {
    API.comments.add(comment).then(() => getComments());
  };
  if (users) {
    return (
      <>
        <AddComment
          pageId={pageId}
          users={users}
          onSubmit={handleSubmit}
        />
        <CommentsList
          comments={comments}
          onDelete={handleDelete}
          users={users} />
      </>
    );
  } else { return <h2>loading. . .</h2>; };
};

Comments.propTypes = {
  pageId: PropTypes.string
};

export default Comments;
