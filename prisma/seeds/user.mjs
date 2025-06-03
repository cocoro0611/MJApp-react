import { PrismaClient } from "@prisma/client";
import { USER_LIST } from "../../src/constants/iconList.ts";

const prisma = new PrismaClient();

const main = async () => {
  for (let i = 0; i < USER_LIST.length; i++) {
    const user = USER_LIST[i];

    await prisma.user.create({
      data: {
        name: user.name,
        icon: user.icon,
        isDefaultUser: i < 4, // 最初の4つだけtrue
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
};

main();
