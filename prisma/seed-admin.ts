
import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@admin.com";
  const password = "qwe123qwe";
  const displayName = "Erū Ilúvatar";

  console.log(`Seeding admin user: ${email}`);

  // 1. Ensure ADMIN role exists
  const roleName = "ADMIN";
  let adminRole = await prisma.role.findUnique({
    where: { name: roleName },
  });

  if (!adminRole) {
    console.log(`Role ${roleName} not found, creating...`);
    adminRole = await prisma.role.create({
      data: { name: roleName },
    });
  }
  console.log(`Role ID: ${adminRole.id}`);

  // 2. Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // 3. Create or Update User
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      displayName,
      status: "ACTIVE",
    },
    create: {
      email,
      passwordHash,
      displayName,
      status: "ACTIVE",
    },
  });

  console.log(`User created/updated: ${user.id} (${user.displayName})`);

  // 4. Assign Role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: user.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      roleId: adminRole.id,
    },
  });

  console.log("Admin role assigned.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
