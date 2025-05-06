import {
  useCreateNewTimeSlotMutation,
  useDeleteTimeSlotMutation,
  useGetAllTimeSlotsQuery,
  useUpdateTimeSlotMutation,
} from "../redux/timeSlot/timeSlotApi";

const TimeSlotManagement = () => {
  const { data: timeSlots = [] } = useGetAllTimeSlotsQuery();

  // Handle Create Time Slot

  // Handle Update Time Slot

  // Handle Delete Time Slot

  return (
    <>
      {/* Time Slot Management */}
      <section>
        <h2>Time Slot Management</h2>
        <div>
          <h3>Create New Time Slot</h3>
          {/* Inputs to create time slots */}
        </div>

        {/* Map all the time slots here */}
        <h3>All Time Slots</h3>
        <ul>
          {timeSlots.map((slot) => (
            <li key={slot.id}>
              {slot.date} - {slot.time} (
              {slot.isBooked ? "Booked" : "Available"})<button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default TimeSlotManagement;
