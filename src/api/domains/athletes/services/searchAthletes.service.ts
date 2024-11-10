import { Prisma } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

export const searchAthleteService = async (params: {
  name?: string;
  phone?: string;
  skip?: number;
  take?: number;
  orderBy?: Prisma.AthleteOrderByWithRelationInput;
}) => {
  const { name, skip, take, orderBy } = params;

  const athletes = await prisma.athlete.findMany({
    where: {
      AND: [
        name
          ? {
              OR: [
                { firstName: { contains: name, mode: "insensitive" } },
                { lastName: { contains: name, mode: "insensitive" } },
                { phone: { contains: name, mode: "insensitive" } }
              ]
            }
          : {}
      ]
    },
    skip: skip || 0,
    take: take || 10,
    orderBy: orderBy || { createdAt: "desc" }
  });

  return athletes;
};
