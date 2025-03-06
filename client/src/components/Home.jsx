import { useState } from "react";
import { useUpdateTimeSlotMutation } from "../redux/timeSlot/timeSlotApi";

const Home = () => {
  // import RTK Query mutations
  const [updateTimeSlot] = useUpdateTimeSlotMutation();
  // Initialize state for day and time
  const [day, setDay] = useState(false);
  const [time, setTime] = useState(false);

  // Handle dropdown for day selection
  const handleDay = () => {
    setDay(true);
  };

  // Handle dropdown for time selection
  const handleTime = () => {
    setTime(true);
  };

  // Handle Step One form completion

  const handleStepOne = async (id) => {
    await updateTimeSlot({ id, isBooked: true });
    alert("Time slot booked successfully!");

    // Reset state
    setDay(false);
    setTime(false);
  };

  if (day && time) {
    handleStepOne();
  }

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
            {/* What Day works for you? */}
            <select
              name="day"
              id="day"
              aria-placeholder="What day works for you?"
            >
              <option onClick={handleDay}>Day 1</option>
              <option onClick={handleDay}>Day 2</option>
              <option onClick={handleDay}>Day 3</option>
            </select>
          </li>
          <li>
            <select
              name="time"
              id="time"
              aria-placeholder="What time works for you?"
            >
              <option onClick={handleTime}>All Day</option>
              <option onClick={handleTime}>Morning</option>
              <option onClick={handleTime}>Afternoon</option>
              <option onClick={handleTime}>Evening</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
