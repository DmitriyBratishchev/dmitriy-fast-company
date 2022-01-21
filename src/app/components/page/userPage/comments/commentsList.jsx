import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import { toNumber } from "lodash";

const CommentsList = ({ comments, onDelete }) => {
  const commentsBySort = [...comments].sort((a, b) => (toNumber(a.created_at) < toNumber(b.created_at)) ? 1 : -1);
  if (commentsBySort.length) {
    return (
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Комментарии</h2>
          <hr />
          { commentsBySort.map((comment) => {
            return <Comment key={ comment._id } comment={ comment } onDelete={ onDelete } />;
          }) }
        </div>
      </div>
    );
  } else {
    return <h3>Пока нет комментариев.</h3>;
  };
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  onDelete: PropTypes.func
};

export default CommentsList;
