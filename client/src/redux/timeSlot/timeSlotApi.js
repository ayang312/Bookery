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

    // Update a time slot
    updateTimeSlot: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/time-slots/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete a time slot
    deleteTimeSlot: builder.mutation({
      query: (id) => ({
        url: `/time-slots/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTimeSlotsQuery,
  useCreateNewTimeSlotMutation,
  useUpdateTimeSlotMutation,
  useDeleteTimeSlotMutation,
} = timeSlotApi;
