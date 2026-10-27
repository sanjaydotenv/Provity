import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    accessToken: null,
    user: null,
    loading: true
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserData: (state , action) => {
        state.user = action.payload
    },
    setLoading: (state , action) => {
      state.loading = action.payload
    }
  },
});

export const { setAccessToken , setUserData , setLoading} = authSlice.actions;
export default authSlice.reducer;
