import prisma from '../prismaClient.js';

export const getAllAthletes = async () => {
  return await prisma.athlete.findMany();
};
