import { Class, Prisma } from "@prisma/client";
import prisma from "../../../prismaClient.js";

export const listClasses = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ClassWhereUniqueInput;
  where?: Prisma.ClassWhereInput;
  orderBy?: Prisma.ClassOrderByWithRelationInput;
}): Promise<Class[]> => {
  const { skip, take, cursor, where, orderBy } = params;

  console.log("GET /classes requested");

  // Fetch the classes based on provided parameters
  const classes = await prisma.class.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  });

  return classes;
};
