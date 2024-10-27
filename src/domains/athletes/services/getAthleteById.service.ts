import { z } from "zod";
import prisma from "../../../prismaClient.js";
import { idSchema } from "../validation/athlete.schema.js";

type AthleteId = z.infer<typeof idSchema>;


export const getAthleteById = async (id: AthleteId) => {
    return await prisma.athlete.findUnique({
      where: {
        id
      }
    });
  };
