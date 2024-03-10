import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../prismaClient.js";
import { workoutFilterSchema, workoutIdSchema } from "../validation/workoutValidation.js";

type GetAllWorkouts = z.infer<typeof workoutFilterSchema>;
type WorkoutId = z.infer<typeof workoutIdSchema>;

export const getAllWorkouts = async ({ intensity, isPublished, type }: GetAllWorkouts) => {
  return await prisma.workout.findMany({
    where: {
      intensity: intensity,
      isPublished: isPublished,
      type: type
    }
  });
};

export const createWorkout = async (workoutData: Prisma.WorkoutCreateInput) => {
  const timestamp = new Date().toISOString();

  return await prisma.workout.create({
    data: {
      ...workoutData,
      publishAt: timestamp
    }
  });
};

export const deleteWorkout = async (id: WorkoutId) => {
  return await prisma.workout.delete({
    where: {
      id: id
    }
  });
};

export const updateWorkout = async (id: WorkoutId, updatedWorkout: Prisma.WorkoutUpdateInput) => {
  return await prisma.workout.update({
    where: {
      id: id
    },
    data: updatedWorkout
  });
};
