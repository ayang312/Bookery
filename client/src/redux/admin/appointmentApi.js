import { rootApi } from "../api/rootApi";

export const appointmentApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all appointments
    getAllAppointments: builder.query({
      query: () => "/appointments",
    }),

    // Create a new appointment
    createNewAppointment: builder.mutation({
      query: (newAppointment) => ({
        url: "/appointments",
        method: "POST",
        body: newAppointment,
      }),
    }),
  }),
});

export const { useGetAllAppointmentsQuery, useCreateNewAppointmentMutation } =
  appointmentApi;
