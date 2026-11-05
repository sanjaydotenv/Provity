import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/provity/state/AuthSlice";
import flowReducer from "../features/provity/state/FlowSlice";
import managementReducer from "../features/provity/state/ManagementSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    flow: flowReducer,
    manage: managementReducer,
  },
});
