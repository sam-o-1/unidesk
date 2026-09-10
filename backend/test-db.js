const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const branch = await prisma.branch.create({
    data: { name: "My First Branch", address: "123 Main Street" }
  });
  console.log("Created branch:", branch);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());