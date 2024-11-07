import prisma from "../../../../prismaClient.js";

export const listAthleteService = async (page = 1, limit = 5, isCoach?: boolean) => {
  // Ensure page is at least 1
  const validatedPage = Math.max(page, 1);
  const validatedLimit = Math.max(limit, 1);

  const athletes = await prisma.athlete.findMany({
    where: {
      ...(isCoach !== undefined && { isCoach: isCoach })
    },
    take: validatedLimit,
    skip: (validatedPage - 1) * validatedLimit
  });

  const totalCount = await prisma.athlete.count({
    where: {
      ...(isCoach !== undefined && { isCoach: isCoach })
    }
  });

  return {
    athletes,
    totalCount,
    rowsPerPage: validatedLimit,
    currentPage: validatedPage,
    totalPages: Math.ceil(totalCount / validatedLimit)
  };
};
