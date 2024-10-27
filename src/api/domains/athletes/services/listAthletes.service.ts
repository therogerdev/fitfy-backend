import prisma from "../../../../prismaClient.js";

export const listAthletes = async (page = 1, limit = 5) => {
  return await prisma.athlete.findMany({
    take: limit,
    skip: (page - 1) * limit
  });
};
