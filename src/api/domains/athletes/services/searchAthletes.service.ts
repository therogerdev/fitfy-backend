import { Prisma } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

export const searchAthleteService = async ({
  name,
  page = 1,
  limit = 10,
}: {
  name?: string;
  page?: number;
  limit?: number;
}) => {
  const validatedPage = Math.max(page, 1);
  const validatedLimit = Math.max(limit, 1);

  const where:Prisma.AthleteWhereInput =
    name?.toLowerCase() === "all"
      ? {}
      : {
          OR: [
            { firstName: { contains: name, mode: "insensitive" } },
            { lastName: { contains: name, mode: "insensitive" } },
            { email: { contains: name, mode: "insensitive" } },
            { phone: { contains: name, mode: "insensitive" } },
          ],
        };

  const athletes = await prisma.athlete.findMany({
    where,
    skip: (validatedPage - 1) * validatedLimit,
    take: validatedLimit,
    orderBy: { createdAt: "desc" },
  });

  const totalCount = await prisma.athlete.count({ where });

  return {
    athletes,
    totalCount,
    rowsPerPage: validatedLimit,
    currentPage: validatedPage,
    totalPages: Math.ceil(totalCount / validatedLimit),
  };
};