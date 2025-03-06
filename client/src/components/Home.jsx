import { useState } from "react";
import {
  useGetAllTimeSlotsQuery,
  useUpdateTimeSlotMutation,
} from "../redux/timeSlot/timeSlotApi";

const Home = () => {
  // Fetch time slots from backend via RTK Query
  const {
    data: timeSlots = [],
    isLoading,
    isError,
  } = useGetAllTimeSlotsQuery();
  const [updateTimeSlot] = useUpdateTimeSlotMutation();

  // Initialize state for day and time
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Handle Step One form completion
  const handleStepOne = async (id) => {
    if (!selectedDay || !selectedTime) {
      alert("Please select both a day and a time.");
      return;
    }

    // Update time slot booking status
    await updateTimeSlot({ id, isBooked: true });
    alert("Time slot booked successfully!");

    // Reset selections
    setSelectedDay("");
    setSelectedTime("");
  };

  // Find days from the time slots
  const availableDays = [
    ...new Set(
      timeSlots.map((slot) => new Date(slot.date).toLocaleDateString())
    ),
  ];

  return (
    <div>
      <div>
        <h1>Book Your Time Slot</h1>
        <span>
          Use the scheduler to select a time that works for a 30-45 minute
          virtual consultation with a Wedding Consultant.
        </span>
      </div>
      <br />
      <div>
        <h2>Step 1</h2>
        <span>
          Hello, tell us about your availability for a 30-45 minute virtual
          consultation.
        </span>
        <ul>
          {/* Map all Time Slots here */}
          <li>
            {/* Day Selection */}
            <label htmlFor="day">What day works for you?</label>
            <select
              name="day"
              id="day"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="">Select a day</option>
              {availableDays.map((day) => {
                return (
                  <option key={day} value={day}>
                    {day}
                  </option>
                );
              })}
            </select>
          </li>
          <li>
            {/* Time Selection */}
            {/* <label htmlFor="time">What time works for you?</label>
            <select name="time" id="time" value={selectedTime}>
              <option onClick={handleTime}>All Day</option>
              <option onClick={handleTime}>Morning</option>
              <option onClick={handleTime}>Afternoon</option>
              <option onClick={handleTime}>Evening</option>
            </select> */}
          </li>
        </ul>
        {/* Submit Button */}
        <button onClick={handleStepOne}>Continue to Step 2</button>
      </div>
    </div>
  );
};

export default Home;
