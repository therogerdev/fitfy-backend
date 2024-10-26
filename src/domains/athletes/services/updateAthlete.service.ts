import httpStatus from "http-status";
import prisma from "../../../prismaClient.js";
import ApiError from "../../../utils/ApiError.js";
import { getAthleteById } from "./getAthleteById.service.js";

import { z } from "zod";
import { idSchema, updateAthleteSchema } from "../validation/athlete.schema.js";

type CreateAthleteData = z.infer<typeof updateAthleteSchema>;
type AthleteId = z.infer<typeof idSchema>;


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
