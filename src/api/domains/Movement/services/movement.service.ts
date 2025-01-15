import { Prisma } from "@prisma/client";
import prisma from "../../../../prismaClient.js";
import { AllMovements } from "../movementList.js";

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


export const createManyMovements = async () => {
  return await prisma.movement.createMany({
    data: AllMovements,
    skipDuplicates: true
  })
}
