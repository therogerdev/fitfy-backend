import prisma from "../prismaClient.js";
import { z } from "zod";
import { createAthleteSchema, idSchema } from "../validation/athleteValidation.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

// Infer the TypeScript type from the schema
type CreateAthleteData = z.infer<typeof createAthleteSchema>;
type AthleteId = z.infer<typeof idSchema>;

export const getAllAthletes = async (filter = {}) => {
  return await prisma.athlete.findMany({
    where: filter
  });
};

export const getAthleteById = async (id: AthleteId) => {
  return await prisma.athlete.findUnique({
    where: {
      id
    }
  });
};

export const createAthlete = async (data: CreateAthleteData) => {
  const existingAthlete = await prisma.athlete.findUnique({
    where: {
      email: data.email
    }
  });

  if (existingAthlete) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Athlete with this email already exists");
  }

  return await prisma.athlete.create({
    data
  });
};

export const updateAthlete = async (id: AthleteId, updateBody: CreateAthleteData) => {
  const athlete = await getAthleteById(id);

  if (!athlete) {
    throw new ApiError(httpStatus.NOT_FOUND, "Athlete not found, please provide a valid id");
  }

  if (athlete) {
    return await prisma.athlete.update({
      where: {
        id
      },
      data: updateBody
    });
  }
};


export const deleteAthlete = async (id: AthleteId) => {

  const athlete = await getAthleteById(id);

  if (!athlete) {
    throw new ApiError(httpStatus.NOT_FOUND, "Athlete not found, please provide a valid id");
  }

  if (athlete) {
    return await prisma.athlete.delete({
      where: {
        id
      }
    });
  }

}
