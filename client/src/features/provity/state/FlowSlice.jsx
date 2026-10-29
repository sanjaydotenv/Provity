import { createSlice } from "@reduxjs/toolkit";

const flowSlice = createSlice({
  name: "Slice",
  initialState: {
    allFlows: null,
    oneFlow: null,
    DateWiseData: null,
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
  },
});

export const { setFlowData, setOneFlowData , setDateWiseData} = flowSlice.actions;

export default flowSlice.reducer;
