import React from "react";
import { RandomAvatar } from "../../../ui/qualites";
import PropTypes from "prop-types";
import { timeDifference } from "../../../../particales/timeDifference";
import { toNumber } from "lodash";

const CommentsList = ({ comments, onDelete, users }) => {
  const getNameUser = (id) => {
    return users.find(user => user._id === id).name;
  };
  const commentsBySort = comments.sort((a, b) => (toNumber(a.created_at) < toNumber(b.created_at)) ? 1 : -1);
  if (commentsBySort?.length) {
    return (
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Комментарии</h2>
          <hr />
          {commentsBySort.map((comment) => {
            return <div key={comment._id} className="bg-light card-body  mb-3">
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-start ">
                    <RandomAvatar />
                    <div className="flex-grow-1 flex-shrink-1">
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-1 ">
                            {getNameUser(comment.userId)}
                            <span className="small">
                              {" - "}{timeDifference(comment.created_at)}
                            </span>
                          </p>
                          <button onClick={() => onDelete(comment._id)} className="btn btn-sm text-primary d-flex align-items-center">
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                        <p className="small mb-0">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>;
          })}
        </div>
      </div>
    );
  } else {
    return <h3>Пока нет комментариев.</h3>;
  };
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  users: PropTypes.array,
  onDelete: PropTypes.func
};

export default CommentsList;
