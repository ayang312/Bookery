import { rootApi } from "../api/rootApi";

export const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users
    getAllUsers: builder.query({
      query: () => "/users",
    }),

    // Create a new user
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useCreateUserMutation } = userApi;
