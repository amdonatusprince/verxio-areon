"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobDetails: {},
  userProfile:{}
};

const JobSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {
    setJobDetails: (state, action) => {
      state.jobDetails = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export default JobSlice.reducer
export const {setJobDetails, setUserProfile} = JobSlice.actions
