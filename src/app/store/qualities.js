import { createSlice } from "@reduxjs/toolkit";
import { isOutDated } from "../particales/isOutDated";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: [],
    isloading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isloading = true;
    },
    qualitiesReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isloading = false;
    },
    qualiriesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isloading = false;
    }
  }
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualiriesRequestFiled } = actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutDated(lastFetch)) {
    console.log(lastFetch);
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.get();
      dispatch(qualitiesReceved(content));
    } catch (error) {
      dispatch(qualiriesRequestFiled(error.message));
    }
  }
};

// Селекторы
export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isloading;

export default qualitiesReducer;
