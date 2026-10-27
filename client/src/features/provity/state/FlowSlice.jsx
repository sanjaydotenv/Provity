import { createSlice } from "@reduxjs/toolkit";

const flowSlice = createSlice({
  name: "Slice",
  initialState: {
    allFlows: null,
  },
  reducers: {
    setFlowData: (state, action) => {
      state.allFlows = action.payload;
    },
  },
});

export const { setFlowData } = flowSlice.actions;

export default flowSlice.reducer;
