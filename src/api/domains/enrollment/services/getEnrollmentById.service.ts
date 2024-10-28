import { ClassEnrollment } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

export const getEnrollmentByIdService = async (id: ClassEnrollment["id"]) => {
  return prisma.classEnrollment.findFirst({ where: { id } });
};
