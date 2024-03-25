import prisma from "../../prismaClient.js";
import { Prisma } from "@prisma/client";

export const getAllCoaches = async (speciality: Prisma.CoachWhereInput["speciality"]) => {
  return await prisma.coach.findMany({
    where: speciality ? { speciality: speciality } : {}
  });
};

export const getCoachById = async (id: string) => {
  return await prisma.coach.findUnique({
    where: {
      id
    }
  });
};

export const createCoach = async (data: Prisma.CoachCreateInput) => {
  return await prisma.coach.create({
    data
  });
};
