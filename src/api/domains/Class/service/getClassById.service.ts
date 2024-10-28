import prisma from "../../../../prismaClient.js";

export const getClassByIdService = async (id: string) => {
  return prisma.class.findFirst({ where: { id } });
};
