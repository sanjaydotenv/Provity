import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    accessToken: null,
    user: null
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserData: (state , action) => {
        state.user = action.payload
    }
  },
});

export const { setAccessToken , setUserData} = authSlice.actions;
export default authSlice.reducer;
