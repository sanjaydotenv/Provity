import { createSlice } from "@reduxjs/toolkit";

const flowSlice = createSlice({
  name: "Slice",
  initialState: {
    allFlows: null,
    oneFlow: null,
  },
  reducers: {
    setFlowData: (state, action) => {
      state.allFlows = action.payload;
    },
    setOneFlowData: (state, action) => {
      state.oneFlow = action.payload;
    },
  },
});

export const { setFlowData, setOneFlowData } = flowSlice.actions;

export default flowSlice.reducer;
