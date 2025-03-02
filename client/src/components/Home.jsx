import { useUpdateTimeSlotMutation } from "../redux/timeSlot/timeSlotApi";

const Home = () => {
  // import RTK Query mutations
  const [updateTimeSlot] = useUpdateTimeSlotMutation();

  const handleBook = async (id) => {
    await updateTimeSlot({ id, isBooked: true });
    alert("Time slot booked successfully!");
  };

  return (
    <div>
      <h1>Book Your Time Slot</h1>
      <ul>
        "Map all Time Slots here"
        <li>
          Time Slot 1<button onClick={handleBook}>Book Now</button>
        </li>
        <li>
          Time Slot 2<button onClick={handleBook}>Book Now</button>
        </li>
      </ul>
    </div>
  );
};

export default Home;
