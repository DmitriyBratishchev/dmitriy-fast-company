import { createSlice } from "@reduxjs/toolkit";
import { isOutDated } from "../particales/isOutDated";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: [],
    isloading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isloading = true;
    },
    professionsReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isloading = false;
    },
    professionsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isloading = false;
    }
  }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsRequested, professionsReceved, professionsRequestFiled } = actions;

export const loadProfessions = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutDated(lastFetch)) {
    console.log(lastFetch);
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsReceved(content));
    } catch (error) {
      dispatch(professionsRequestFiled(error.message));
    }
  }
};

// Селекторы
export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isloading;

export default professionsReducer;
