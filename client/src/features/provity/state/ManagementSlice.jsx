import { createSlice } from "@reduxjs/toolkit";

const managementSlice = createSlice({
  name: "Management",

  initialState: {
    plan: null,
    loading: true,
  },

  reducers: {
    setPlan: (state, action) => {
      state.plan = action.payload;
      state.loading = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPlan, setLoading } = managementSlice.actions;

export default managementSlice.reducer;
