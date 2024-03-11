import prisma from "../prismaClient.js";
import { z } from "zod";

const programSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  workouts: z.array(z.string()).optional(),
  isArchived: z.boolean().optional(),
});

type ProgramType = z.infer<typeof programSchema>;

export const getAllPrograms = async () => {
  return await prisma.program.findMany();
};

export const createProgram = async (data: ProgramType) => {
  return await prisma.program.create({ data });
};
