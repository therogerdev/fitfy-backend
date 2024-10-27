import { Prisma, Programs } from "@prisma/client";
import prisma from "../../../prismaClient.js";
import { z } from "zod";

const programSchema = z.object({
  id: z.string().optional(), // Optional as it's generated automatically
  slug: z.string(),
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

export const getAllPrograms = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProgramsWhereUniqueInput;
  where?: Prisma.ProgramsWhereInput;
  orderBy?: Prisma.ProgramsOrderByWithRelationInput;
}): Promise<Programs[]> => {
  const { skip, take, cursor, where, orderBy } = params;

  try {
    console.log("GET /programs requested");

    // Fetch the programs based on provided parameters
    const programs = await prisma.programs.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });

    console.log("Fetched all programs");
    return programs;
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw new Error("Failed to fetch programs");
  }
};

export const createProgram = async (data: ProgramType) => {
  return await prisma.programs.create({
    data: {
      slug: data.slug || "",
      name: data.name,
      description: data.description || "",

      numClassesPerWeek: Number(data.numClassesPerWeek),
      numWeeks: Number(data.numWeeks),
      durationMin: Number(data.durationMin),
      durationMax: Number(data.durationMax),
      totalClasses: Number(data.totalClasses),
      isDraft: data.isDraft ?? false,
      active: data.active ?? true,
      published: data.published ?? true,
      hasSchedule: data.hasSchedule ?? false,
      boxId: data.boxId || null,
      classesId: data.classesId || null,
      createdAt: data.createdAt || new Date()
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
      numClassesPerWeek: Number(data.numClassesPerWeek),
      numWeeks: Number(data.numWeeks),
      durationMin: Number(data.durationMin),
      durationMax: Number(data.durationMax),
      totalClasses: Number(data.totalClasses),
      isDraft: data.isDraft ?? false,
      active: data.active ?? true,
      published: data.published ?? true,
      hasSchedule: data.hasSchedule ?? false,
      boxId: data.boxId || null, // Ensure nullable if not provided
      classesId: data.classesId || null, // Same here
      createdAt: data.createdAt || new Date() // Default to current date if not provided
    }
  });
};

export const deleteProgram = async (id: string) => {
  return await prisma.programs.delete({
    where: { id }
  });
};

export const getProgramBySlug = async (slug: string) => {
  return await prisma.programs.findUnique({
    where: {
      slug
    }
  });
};
