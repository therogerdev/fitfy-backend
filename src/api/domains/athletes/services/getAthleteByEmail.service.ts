import prisma from "../../../../prismaClient.js";
import { emailSchema } from "../validation/athlete.schema.js";
import { z } from "zod";

type AthleteEmail = z.infer<typeof emailSchema>;


export const getAthleteByEmail = async (email: AthleteEmail) => {
    return await prisma.athlete.findUnique({
      where: {
        email
      }
    });
  };
