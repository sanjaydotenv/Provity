import { createSlice } from "@reduxjs/toolkit";

const flowSlice = createSlice({
  name: "Slice",
  initialState: {
    allFlows: null,
    oneFlow: null,
    DateWiseData: null,
    todayTasks: null,
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
  },
});

export const { setFlowData, setOneFlowData, setDateWiseData , setTodayTasks} =
  flowSlice.actions;

export default flowSlice.reducer;
