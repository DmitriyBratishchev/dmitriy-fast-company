import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
// import { isOutDated } from "../particales/isOutDated";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: [],
    isloading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isloading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isloading = false;
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isloading = false;
    },
    addComment: (state, action) => {
      state.entities.push(action.payload);
      state.isloading = false;
    },
    deleteComment: (state, action) => {
      state.entities = state.entities.filter(c => c._id !== action.payload);
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const { commentsRequested, commentsReceved, commentsRequestFiled, addComment, deleteComment } = actions;

export const loadComments = (userId) => async (dispatch, extra, signal) => {
  console.log("dispatch", dispatch, extra(), signal);
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const createComment = (data) => async (dispatch, getState) => {
  const { users } = getState();

  const comment = {
    ...data,
    _id: nanoid(),
    userId: users.auth.userId,
    created_at: Date.now()
  };
  // console.log("comment", comment);
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(addComment(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const removeComment = (id) => async (dispatch) => {
  try {
    const { content } = await commentService.removeComment(id);
    // console.log("removeCommets content", content);
    if (content === null) {
      dispatch(deleteComment(id));
    }
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

// Селекторы
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isloading;

export default commentsReducer;
