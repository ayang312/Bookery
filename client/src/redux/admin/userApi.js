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
    // Update a user
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
