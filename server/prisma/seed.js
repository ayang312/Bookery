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
}
