import { rootApi } from "../api/rootApi";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // User Login
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),

  }),
});
