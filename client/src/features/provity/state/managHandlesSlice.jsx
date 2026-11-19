import { createSlice } from "@reduxjs/toolkit";

const manageHandleSlice = createSlice({
  name: "ManageHandles",

  initialState: {
    allHandles: [],
  },

  reducers: {
    setAllHandle: (state, action) => {
      state.allHandles = action.payload;
    },
  },
});

export const { setAllHandle } = manageHandleSlice.actions;

export default manageHandleSlice.reducer;
