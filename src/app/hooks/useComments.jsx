import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const { id: pageId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments();
  }, [pageId]);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    console.log("error", error);
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  async function createComment(data) {
    // console.log("useComment", data);
    const comment = {
      ...data,
      _id: nanoid(),
      pageId,
      userId: currentUserId,
      created_at: Date.now()
    };
    // console.log("comment", comment);
    try {
      const { content } = await commentService.createComment(comment);
      // console.log("createComment content", content);
      setComments((prev) => [...prev, content]);
    } catch (error) {
      errorCatcher(error);
    }
  };

  async function getComments() {
    try {
      const { content } = await commentService.getComments(pageId);
      // console.log("getCommets content", content);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      // console.log("removeCommets content", content);
      if (content === null) {
        setComments(prev => prev.filter(comment => comment._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  // console.log("CommentsProvider работает", professions, isLoading);
  return (
    <CommentsContext.Provider value={ { comments, createComment, isLoading, removeComment } }>
      { children }
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
