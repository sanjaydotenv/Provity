import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/provity/state/AuthSlice";
import flowReducer from "../features/provity/state/FlowSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    flow: flowReducer,
  },
});
