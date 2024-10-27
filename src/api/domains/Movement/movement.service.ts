import { Prisma } from "@prisma/client";
import prisma from "../../../prismaClient.js";

export const getAllMovements = async (category: Prisma.MovementCreateInput["category"]) => {
  return await prisma.movement.findMany({
    where: {
      category
    }
  });
};

export const getMovementById = async (id: Prisma.MovementCreateInput["id"]) => {
  return await prisma.movement.findUnique({
    where: {
      id: id
    }
  });
};
