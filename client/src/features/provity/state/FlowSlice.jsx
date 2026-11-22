import { createSlice } from "@reduxjs/toolkit";

const flowSlice = createSlice({
  name: "Slice",
  initialState: {
    allFlows: null,
    oneFlow: null,
    DateWiseData: null,
    todayTasks: null,
    dayFlowAllTaskDetails: null,
    loading: false,
  },
  reducers: {
    setFlowData: (state, action) => {
      state.allFlows = action.payload;
    },
    setOneFlowData: (state, action) => {
      state.oneFlow = action.payload;
    },
    setDateWiseData: (state, action) => {
      state.DateWiseData = action.payload;
    },
    setTodayTasks: (state, action) => {
      state.todayTasks = action.payload;
    },
    setDayFlowDetailsData: (state, action) => {
      state.dayFlowAllTaskDetails = action.payload;
    },
    setLoadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setFlowData,
  setOneFlowData,
  setDateWiseData,
  setTodayTasks,
  setDayFlowDetailsData,
  setLoadingState
} = flowSlice.actions;

export default flowSlice.reducer;
