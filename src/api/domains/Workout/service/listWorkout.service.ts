import { z } from "zod";
import prisma from "../../../../prismaClient.js";
import { workoutIdSchema } from "../validation/workout.schema.js";

export type WorkoutId = z.infer<typeof workoutIdSchema>;

export const listWorkoutService = async (page = 1, limit = 10, ) => {
    // Ensure page is at least 1
    const validatedPage = Math.max(page, 1);
    const validatedLimit = Math.max(limit, 1);

    const workouts = await prisma.workout.findMany();

    const totalCount = await prisma.workout.count()

  return {
    workouts,
    totalCount,
    rowsPerPage: validatedLimit,
    currentPage: validatedPage,
    totalPages: Math.ceil(totalCount / validatedLimit)
  }
};
