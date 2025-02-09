const prisma = require("../config/db");

async function main() {
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
  
}
