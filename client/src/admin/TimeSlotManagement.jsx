import { useState } from "react";
import {
  useCreateNewTimeSlotMutation,
  useDeleteTimeSlotMutation,
  useGetAllTimeSlotsQuery,
  useUpdateTimeSlotMutation,
} from "../redux/timeSlot/timeSlotApi";

const TimeSlotManagement = () => {
  // RTK query calls
  const { data: timeSlots = [], refetch } = useGetAllTimeSlotsQuery();
  const [createTimeSlot] = useCreateNewTimeSlotMutation();
  const [updateTimeSlot] = useUpdateTimeSlotMutation();
  const [deleteTimeSlot] = useDeleteTimeSlotMutation();

  // Local state
  const [newTimeSlot, setNewTimeSlot] = useState({ date: "", time: "" });
  const [editingSlot, setEditingSlot] = useState(null);

  // Handle Create Time Slot
  const handleCreateTimeSlot = async () => {
    try {
      // Send the newTimeSlot object date and time to the backend and extract the result of the mutation or else throw an error if it fails
      await createTimeSlot(newTimeSlot).unwrap();
      alert("Time slot created successfully");
      setNewTimeSlot({ date: "", time: "" });
      //   Fxn to manually refresh the list of time slots after a mutation
      refetch();
    } catch (error) {
      console.error("Failed to create new time slot", error);
    }
  };

  // Handle Update Time Slot
  const handleUpdateTimeSlot = async () => {
    try {
      // send the object id and whatever else to the backend and update the data.
      await updateTimeSlot({ id: editingSlot.id, ...editingSlot }).unwrap();
      alert("Time slot updated successfully");
      //   Exit the edit mode
      setEditingSlot(null);
      //   Refresh the list after the mutation
      refetch();
    } catch (error) {
      console.error("Failed to update the time slot", error);
    }
  };

  // Handle Delete Time Slot
  const handleDeleteTimeSlot = async (id) => {
    try {
      // Send the id of the time slot to backend to delete it
      await deleteTimeSlot(id).unwrap();
      alert("Time slot deleted successfully");
      //   Refresh list after mutation
      refetch();
    } catch (error) {
      console.error("Failed to delete time slot", error);
    }
  };

  return (
    <>
      {/* Time Slot Management */}
      <section>
        <h2>Time Slot Management</h2>
        <div>
          <h3>Create New Time Slot</h3>
          {/* Inputs to create time slots */}
          <input
            type="date"
            value={newTimeSlot.date}
            onChange={(e) =>
              setNewTimeSlot({ ...newTimeSlot, date: e.target.value })
            }
          />
          <input
            type="time"
            value={newTimeSlot.time}
            onChange={(e) =>
              setNewTimeSlot({ ...newTimeSlot, time: e.target.value })
            }
          />
          <button onClick={handleCreateTimeSlot}>Create Time Slot</button>
        </div>

        {/* Edit Time Slot */}
        {editingSlot && (
          <div>
            <h3>Edit Time Slot</h3>
            <input
              type="date"
              value={editingSlot.date}
              onChange={(e) =>
                setEditingSlot({ ...editingSlot, date: e.target.value })
              }
            />
            <input
              type="time"
              value={editingSlot.time}
              onChange={(e) =>
                setEditingSlot({ ...editingSlot, time: e.target.value })
              }
            />
            <button onClick={handleUpdateTimeSlot}>Update TIme Slot</button>
            <button onClick={() => setEditingSlot(null)}>Cancel</button>
          </div>
        )}

        {/* Map all the time slots here */}
        <h3>All Time Slots</h3>
        <ul>
          {timeSlots.map((slot) => (
            <li key={slot.id}>
              {slot.date} - {slot.time} (
              {slot.isBooked ? "Booked" : "Available"})
              <button onClick={() => setEditingSlot(slot)}>Edit</button>
              <button onClick={() => handleDeleteTimeSlot(slot.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default TimeSlotManagement;
