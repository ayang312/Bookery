const prisma = require("../config/db");

async function seed() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { username: "test1", password: "password", role: "OWNER" },
      { username: "test2", password: "password", role: "MANAGER" },
      { username: "test3", password: "password", role: "ASSISTANT" },
    ],
  });
  console.log(`${users.count} users created`);

  //   Seed TimeSlots
  const timeSlots = await prisma.timeSlot.createMany({
    data: [
      { date: new Date("2025-02-10"), time: "10:00 AM", isBooked: false },
      { date: new Date("2025-02-10"), time: "11:00 AM", isBooked: false },
      { date: new Date("2025-02-10"), time: "12:00 PM", isBooked: true },
      { date: new Date("2025-02-11"), time: "12:00 PM", isBooked: false },
      { date: new Date("2025-02-11"), time: "1:00 PM", isBooked: false },
      { date: new Date("2025-02-12"), time: "12:00 PM", isBooked: true },
      { date: new Date("2025-02-12"), time: "1:00 PM", isBooked: false },
    ],
  });
  console.log(`${timeSlots.count} time slots created`);

  //   Seed Appointments
  const appointment1 = await prisma.appointment.create({
    data: {
      firstName: "Andrew",
      lastName: "test",
      email: "atest@gmail.com",
      phoneNumber: "123-456-7890",
      eventDate: new Date("2025-10-10"),
      primaryVenue: "Grand Central",
      secondaryVenue: "Backup Venue",
      timeSlot: {
        create: {
          date: new Date("2025-02-15"),
          time: "03:00 PM",
          isBooked: true,
        },
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
        lastName: "test",
        email: "ktest@gmail.com",
        phoneNumber: "987-654-3210",
        eventDate: new Date("2025-11-15T00:00:00.000Z"),
        primaryVenue: "Central Park",
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
