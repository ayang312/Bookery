const prisma = require("../config/db");

async function seed() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { username: "test1", password: "test1", role: "OWNER" },
      { username: "test2", password: "test2", role: "MANAGER" },
      { username: "test3", password: "test3", role: "ASSISTANT" },
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
    data: [
      {
        firstName: "Andrew",
        lastName: "test",
        email: "atest@gmail.com",
        phoneNumber: "123-456-7890",
        eventDate: new Date("2025-10-10"),
        primaryVenue: "Crystal Church of NY",
        secondaryVenue: "Larkfield",
        timeSlot: {
          create: {
            date: new Date("2025-02-15"),
            time: "03:00 PM",
            isBooked: true,
          },
        },
      },
    ],
  });
  console.log(
    `Appointment created for ${appointment1.firstName} ${appointment1.lastName}`
  );
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
