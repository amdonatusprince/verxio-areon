"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobDetails: {},
};

const JobSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {
    setJobDetails: (state, action) => {
      state.jobDetails = action.payload;
    },
  },
});

export default JobSlice.reducer
export const {setJobDetails} = JobSlice.actions
