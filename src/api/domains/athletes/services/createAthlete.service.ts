import httpStatus from "http-status";
import { z } from "zod";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";
import { updateAthleteSchema } from "../validation/athlete.schema.js";

type CreateAthleteData = z.infer<typeof updateAthleteSchema>;

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
