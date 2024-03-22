import prisma from "../../prismaClient.js";
import { z } from "zod";

const programSchema = z.object({
  createdAt: z.date().optional().nullable(),
  name: z.string(),
  description: z.string().optional(),
  box: z.array(z.string()).optional(),
  boxId: z.string().optional().nullable()
});

type ProgramType = z.infer<typeof programSchema>;

export const getAllPrograms = async () => {
  return await prisma.program.findMany();
};

export const createProgram = async (data: ProgramType) => {
  return await prisma.program.create({
    data: {
      ...data,
      createdAt: new Date()
    }
  });
};
