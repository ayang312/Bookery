import { rootApi } from "../api/rootApi";

export const timeSlotApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all time slots
    getAllTimeSlots: builder.query({
      query: () => "/time-slots",
    }),

    // Create a new time slot
    createNewTimeSlot: builder.mutation({
      query: (newTimeSlot) => ({
        url: "/time-slots",
        method: "POST",
        body: newTimeSlot,
      }),
      
    }),
  }),
});

export const { useGetAllTimeSlotsQuery, useCreateNewTimeSlotMutation } =
  timeSlotApi;
