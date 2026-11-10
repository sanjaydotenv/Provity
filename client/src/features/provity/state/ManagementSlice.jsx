import { createSlice } from "@reduxjs/toolkit";

const managementSlice = createSlice({
  name: "Management",

  initialState: {
    plan: null,
    loading: true,
    allPlans: null,
    planAllTasks: null,
  },

  reducers: {
    setPlan: (state, action) => {
      state.plan = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllPlans: (state, action) => {
      state.allPlans = action.payload;
    },
    setPlanAllTasks: (state, action) => {
      state.planAllTasks = action.payload;
    },
  },
});

export const { setPlan, setLoading, setAllPlans, setPlanAllTasks } =
  managementSlice.actions;

export default managementSlice.reducer;
