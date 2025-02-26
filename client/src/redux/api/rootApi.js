import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      // Set the Content-Type header
      headers.set("Content-type", "application/json");
      return headers;
    },
    // need to set this to "include" for cookies to work
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
