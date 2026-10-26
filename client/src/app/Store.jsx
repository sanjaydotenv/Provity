import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/provity/state/AuthSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
