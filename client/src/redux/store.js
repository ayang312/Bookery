import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
