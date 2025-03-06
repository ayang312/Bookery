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

  // Preset the Next 10 Days for Day Selection Dropdown
  const nextTenDays = [];
  const today = new Date();

  for (let i = 1; i <= 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = date.toLocaleDateString("en-US");

    nextTenDays.push({ dayOfWeek, formattedDate });
  }

  // Preset Time Options for Time Selection Dropdown
  const timeOptions = ["All Day", "Morning", "Afternoon", "Evening"];

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

  // Filter the time slots for the selected day

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
              {nextTenDays.map((day) => {
                return (
                  <option key={day.formattedDate} value={day.formattedDate}>
                    {day.dayOfWeek}, {day.formattedDate}
                  </option>
                );
              })}
            </select>
          </li>
          <li>
            {/* Time Selection */}
            <label htmlFor="time">What time works for you?</label>
            <select
              name="time"
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select a time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </li>
        </ul>

        {/* Submit Button */}
        <button onClick={handleStepOne}>
          {/* Loading */}
          {isLoading ? "Loading available time slots" : "Continue to Step 2"}
        </button>

        {isError && (
          <div>
            {error?.data?.message ||
              "No Time Slots found, please choose a different date or time"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
