import httpStatus from "http-status";
import { z } from "zod";
import ApiError from "../../../../utils/ApiError.js";
import prisma from "../../../../prismaClient.js";
import { idSchema } from "../validation/athlete.schema.js";
import { getAthleteById } from "./getAthleteById.service.js";

// Infer the TypeScript type from the schema
type AthleteId = z.infer<typeof idSchema>;

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
};
