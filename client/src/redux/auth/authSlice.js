import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Set initial state for Authentication
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
