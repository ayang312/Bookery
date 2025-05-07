import {
  useCreateNewAppointmentMutation,
  useGetAllAppointmentsQuery,
} from "../redux/admin/appointmentApi";

const AppointmentTracking = () => {
  // RTK Query calls
  const { data: appointments = [], refetchAppointments } =
    useGetAllAppointmentsQuery();
  const [createNewAppointment] = useCreateNewAppointmentMutation();

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
  // Handle updating appointments

  // Handle deleting appointments

  return (
    <>
      <section>
        <h2>Appointment Tracking</h2>

        {/* Create New Appointment */}

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
