import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllAthletes = async (req, res) => {
  const athlete = await prisma.athlete.findMany();
  res.json(athlete);
};
