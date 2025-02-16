const prisma = require("../config/db");

async function seed() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        username: "admin1",
        password: "password",
        email: "admin1@example.com",
        role: "ADMIN",
      },
      {
        username: "assistant1",
        password: "password",
        email: "assistant1@example.com",
        role: "ASSISTANT",
      },
      {
        username: "assistant2",
        password: "password",
        email: "assistant2@example.com",
        role: "ASSISTANT",
      },
    ],
  });
  console.log(`${users.count} users created`);

  //   Seed TimeSlots
  const timeSlots = await prisma.timeSlot.createMany({
    data: [
      { date: new Date("2025-02-20"), time: "10:00 AM", isBooked: false },
      { date: new Date("2025-02-20"), time: "11:00 AM", isBooked: false },
      { date: new Date("2025-02-20"), time: "12:00 PM", isBooked: true },
      { date: new Date("2025-02-21"), time: "12:00 PM", isBooked: false },
      { date: new Date("2025-02-21"), time: "1:00 PM", isBooked: false },
      { date: new Date("2025-02-22"), time: "12:00 PM", isBooked: true },
      { date: new Date("2025-02-22"), time: "1:00 PM", isBooked: false },
    ],
  });
  console.log(`${timeSlots.count} time slots created`);

  //   Seed Appointments
  const appointment1 = await prisma.appointment.create({
    data: {
      firstName: "Andrew",
      lastName: "Test",
      email: "atest@example.com",
      phoneNumber: "123-456-7890",
      eventDate: new Date("2025-10-10"),
      primaryVenue: "Grand Central",
      secondaryVenue: "Backup Venue",
      timeSlot: {
        connect: { id: 3 }, //Link to timeslot id 3
      },
    },
  });
  console.log(
    `Appointment created for ${appointment1.firstName} ${appointment1.lastName}`
  );

  // Seed Appointments (Option 2: Multiple Appointments without Nested TimeSlot)
  const appointments = await prisma.appointment.createMany({
    data: [
      {
        firstName: "Kathy",
        lastName: "Test",
        email: "ktest@example.com",
        phoneNumber: "987-654-3210",
        eventDate: new Date("2025-11-15T00:00:00.000Z"),
        primaryVenue: "Central Park",
        secondaryVenue: "Backup Venue",
        timeSlot: {
          connect: { id: 6 }, //Link to the time slot with id 6
        },
      },
      {
        firstName: "Mike",
        lastName: "Test",
        email: "mtest@example.com",
        phoneNumber: "555-123-4567",
        eventDate: new Date("2025-12-01T00:00:00.000Z"),
        primaryVenue: "City Hall",
        secondaryVenue: "Backup Venue",
      },
      {
        firstName: "Grace",
        lastName: "Test",
        email: "gtest@example.com",
        phoneNumber: "555-987-6543",
        eventDate: new Date("2025-12-05T00:00:00.000Z"),
        primaryVenue: "Beachside Resort",
        secondaryVenue: "Backup Venue",
      },
    ],
  });
  console.log(`${appointments.count} additional appointments created.`);
}

seed()
  .then(async (e) => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
