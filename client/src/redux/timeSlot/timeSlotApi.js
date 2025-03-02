import { rootApi } from "../api/rootApi";

export const timeSlotApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // Fetch all time slots
    getAllTimeSlots: builder.query({
        query: () => "/time-slots",
    }),

  }),
});