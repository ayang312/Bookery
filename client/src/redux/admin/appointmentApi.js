import { rootApi } from "../api/rootApi";

export const appointmentApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all appointments
    getAllAppointments: builder.query({
      query: () => "/appointments",
    }),
  }),
});

export const { useGetAllAppointmentsQuery } = appointmentApi;
