import { rootApi } from "../api/rootApi";

export const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users
    getAllUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
