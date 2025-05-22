import {
  useCreateNewAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAllAppointmentsQuery,
} from "../redux/admin/appointmentApi";
import { useGetAllTimeSlotsQuery } from "../redux/admin/timeSlotApi";

const AppointmentTracking = () => {
  // RTK Query calls
  const { data: appointments = [], refetchAppointments } =
    useGetAllAppointmentsQuery();
  const { data: timeSlots = [] } = useGetAllTimeSlotsQuery();

  //   Mutation calls for creating and deleting appointments
  const [createNewAppointment] = useCreateNewAppointmentMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  // Local state for new appointment form
  const [newAppointment, setNewAppointment] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    eventDate: "",
    primaryVenue: "",
    secondaryVenue: "",
    timeSlotId: "",
  });

  // Handle creating new appointments
  const handleCreateNewAppointment = async () => {
    try {
      // Ensure that a time slot is selected
      if (!newAppointment.timeSlotId) {
        alert("Please select a time slot");
        return;
      }

      //   Create the new appointment
      await createNewAppointment(newAppointment).unwrap();
      alert("Appointment created successfully!");
      //   Reset the state
      setNewAppointment({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        eventDate: "",
        primaryVenue: "",
        secondaryVenue: "",
        timeSlotId: "",
      });
      //   Refresh list of appointments after mutation
      refetchAppointments();
    } catch (error) {
      console.error("Failed to create new appointment", error);
    }
  };

  // Handle deleting appointments
  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id).unwrap();
      alert("Appointment deleted successfully");
      // Refresh list of appointments after mutation call
      refetchAppointments();
    } catch (error) {
      console.error("Failed to delete appointment", error);
    }
  };

  return (
    <>
      <section>
        <h2>Appointment Tracking</h2>

        {/* Create New Appointment */}
        <div>
          <h3>Create New Appointment</h3>
          <input
            type="text"
            value={newAppointment.firstName}
            placeholder="First Name"
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                firstName: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={newAppointment.lastName}
            placeholder="Last Name"
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                lastName: e.target.value,
              })
            }
          />
          <input
            type="email"
            value={newAppointment.email}
            placeholder="Email"
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                email: e.target.value,
              })
            }
          />
          <input
            type="tel"
            value={newAppointment.phoneNumber}
            placeholder="Phone Number"
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                phoneNumber: e.target.value,
              })
            }
          />
          <input
            type="date"
            value={newAppointment.eventDate}
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                eventDate: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={newAppointment.primaryVenue}
            placeholder="Primary Venue"
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                primaryVenue: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={newAppointment.secondaryVenue}
            placeholder="Secondary Venue"
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                secondaryVenue: e.target.value,
              })
            }
          />
          <select
            value={newAppointment.timeSlotId}
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                timeSlotId: e.target.value,
              })
            }
          >
            <option value="">Select a Time Slot</option>
            {timeSlots
              .filter((slot) => !slot.isBooked) // Only show available time slots
              .map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.date} - {slot.time}
                </option>
              ))}
          </select>
          <button onClick={handleCreateNewAppointment}>
            Create Appointment
          </button>
        </div>

        {/* List All Appointments */}
        <h3>All Appointments</h3>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <strong>
                {appointment.firstName} {appointment.lastName}
              </strong>{" "}
              - {appointment.eventDate} at {appointment.primaryVenue}
              <br />
              Email: {appointment.email}, Phone: {appointment.phoneNumber}
              <br />
              Time Slot: {appointment.timeSlot?.date} -{" "}
              {appointment.timeSlot?.time}
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default AppointmentTracking;
