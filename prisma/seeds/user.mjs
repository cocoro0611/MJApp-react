import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: {
      name: "モンスター１",
      icon: "../../public/users-icon/animal_penguin.png",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  await prisma.$disconnect();
};

main();
