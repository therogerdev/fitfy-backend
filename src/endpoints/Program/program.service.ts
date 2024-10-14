import prisma from "../../prismaClient.js";
import { z } from "zod";

const programSchema = z.object({
  id: z.string().optional(), // Optional as it's generated automatically
  slug: z.string().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  numWeeks: z.number().optional().nullable(),
  numClassesPerWeek: z.number().optional().nullable(),
  durationMin: z.number().optional().nullable(),
  durationMax: z.number().optional().nullable(),
  isDraft: z.boolean().optional().nullable(),
  active: z.boolean().optional().default(true),
  published: z.boolean().optional().default(true),
  hasSchedule: z.boolean().optional().default(false),
  totalClasses: z.number().optional().nullable(),
  classesId: z.string().optional().nullable(),
  boxId: z.string().optional().nullable(),
  createdAt: z.date().optional().nullable()
});

type ProgramType = z.infer<typeof programSchema>;

export const getAllPrograms = async () => {
  return await prisma.programs.findMany();
};

export const createProgram = async (data: ProgramType) => {
  return await prisma.programs.create({
    data: {
      slug: data.slug || "",
      name: data.name,
      description: data.description || "",
      numWeeks: data.numWeeks || 0,
      numClassesPerWeek: data.numClassesPerWeek || 0,
      durationMin: data.durationMin || 0,
      durationMax: data.durationMax || 0,
      isDraft: data.isDraft ?? false,
      active: data.active ?? true,
      published: data.published ?? true,
      hasSchedule: data.hasSchedule ?? false,
      totalClasses: data.totalClasses || 0,
      boxId: data.boxId || null, // Ensure nullable if not provided
      classesId: data.classesId || null, // Same here
      createdAt: data.createdAt || new Date() // Default to current date if not provided
    }
  });
};


export const updateProgram = async (id: string, data: ProgramType) => {
  return await prisma.programs.update({
    where: { id },
    data: {
      slug: data.slug || "",
      name: data.name,
      description: data.description || "",
      numWeeks: data.numWeeks || 0,
      numClassesPerWeek: data.numClassesPerWeek || 0,
      durationMin: data.durationMin || 0,
      durationMax: data.durationMax || 0,
      isDraft: data.isDraft ?? false,
      active: data.active ?? true,
      published: data.published ?? true,
      hasSchedule: data.hasSchedule ?? false,
      totalClasses: data.totalClasses || 0,
      boxId: data.boxId || null, // Ensure nullable if not provided
      classesId: data.classesId || null, // Same here
      createdAt: data.createdAt || new Date() // Default to current date if not provided
    }
  });
};



export const deleteProgram = async (id: string) => {
  return await prisma.programs.delete({
    where: { id },
  });
};

export const getProgramById = async (id: string) => {
  return await prisma.programs.findUnique({
    where: {id}
  })
}
