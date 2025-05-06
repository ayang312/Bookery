import { useState } from "react";
import {
  useCreateNewTimeSlotMutation,
  useDeleteTimeSlotMutation,
  useGetAllTimeSlotsQuery,
  useUpdateTimeSlotMutation,
} from "../redux/timeSlot/timeSlotApi";

const TimeSlotManagement = () => {
  const { data: timeSlots = [] } = useGetAllTimeSlotsQuery();
  const [createTimeSlot] = useCreateNewTimeSlotMutation();

  // Local state
  const [newTimeSlot, setNewTimeSlot] = useState({ date: "", time: "" });

  // Handle Create Time Slot
  const handleCreateTimeSlot = async () => {
    try {
      await createTimeSlot(newTimeSlot).unwrap();
      alert("Time slot created successfully");
      setNewTimeSlot({ date: "", time: "" });
    } catch (error) {
      console.error("Failed to create new time slot", error);
    }
  };
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
