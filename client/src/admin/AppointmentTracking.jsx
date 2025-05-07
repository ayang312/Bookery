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
              {appointment.firstName} {appointment.lastName} -{" "}
              {appointment.eventDate} at {appointment.venue}
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default AppointmentTracking;
