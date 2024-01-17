// const { PrismaClient } = require("@prisma/client");
// const { priDB } = require("../prisma/prisma");
// import
// import { priDB } from "../prisma/prisma";

import prisma from "@/prisma/prisma";

// const globalForPrisma = globalThis.prisma;

// const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

(async () => {
  // console.log({ prisma });
  const users = await prisma.users.findMany();

  console.log(users);
})();
