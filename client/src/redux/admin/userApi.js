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

    // Delete a user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
