import commonReducer from "./commonSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});
