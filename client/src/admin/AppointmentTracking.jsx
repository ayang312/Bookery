import { useGetAllAppointmentsQuery } from "../redux/admin/appointmentApi";

const AppointmentTracking = () => {
  // RTK Query calls
  const { data: appointments = [] } = useGetAllAppointmentsQuery();

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
