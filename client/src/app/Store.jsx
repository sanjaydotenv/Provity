import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/provity/state/AuthSlice";
import flowReducer from "../features/provity/state/FlowSlice";
import managementReducer from "../features/provity/state/ManagementSlice";
import manageHandlesReducers from "../features/provity/state/managHandlesSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    flow: flowReducer,
    manage: managementReducer,
    handles: manageHandlesReducers,
  },
});
