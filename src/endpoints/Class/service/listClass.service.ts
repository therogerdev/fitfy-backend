import { Class, Prisma } from "@prisma/client";
import prisma from "../../../prismaClient.js";

export const listClass = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ClassWhereUniqueInput;
  where?: Prisma.ClassWhereInput;
  orderBy?: Prisma.ClassOrderByWithRelationInput;
}): Promise<Class[]> => {
  const { skip, take, cursor, where, orderBy } = params;

  const classes = await prisma.class.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy
  });

  return classes;
};
