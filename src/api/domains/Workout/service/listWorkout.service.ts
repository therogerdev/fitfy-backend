import { Prisma } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

export const listWorkoutService = async (
  page = 1,
  limit = 10,
  filters?: Prisma.WorkoutWhereInput 
) => {
  // Ensure page and limit are valid
  const validatedPage = Math.max(page, 1);
  const validatedLimit = Math.max(limit, 1);

  // Fetch workouts with filters, pagination, and total count
  const workouts = await prisma.workout.findMany({
    where: filters,
    skip: (validatedPage - 1) * validatedLimit,
    take: validatedLimit,
    orderBy: { createdAt: "desc" }, // Order by creation date
  });

  const totalCount = await prisma.workout.count({
    where: filters, // Apply the same filters to count the total
  });

  return {
    workouts,
    totalCount,
    rowsPerPage: validatedLimit,
    currentPage: validatedPage,
    totalPages: Math.ceil(totalCount / validatedLimit),
  };
};