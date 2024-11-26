import { Prisma } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

export const createWorkoutService = async (workoutData: Prisma.WorkoutCreateInput) => {
  return await prisma.workout.create({
    data: {
      ...workoutData
    }
  });
};
