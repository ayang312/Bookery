import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import authReducer from "./auth/authSlice";
import { timeSlotApi } from "./admin/timeSlotApi";
import { userApi } from "./admin/userApi";
import { appointmentApi } from "./admin/appointmentApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [timeSlotApi.reducerPath]: timeSlotApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      timeSlotApi.middleware,
      appointmentApi.middleware,
      userApi.middleware
    ),
});

export default store;
