import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: {
      name: "テスト１",
      createdAt: new Date(),
    },
  });
  await prisma.$disconnect();
};

main();
