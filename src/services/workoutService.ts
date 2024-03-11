import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../prismaClient.js";
import { workoutIdSchema } from "../validation/workoutValidation.js";

type WorkoutId = z.infer<typeof workoutIdSchema>;

export const getAllWorkouts = async () => {
  return await prisma.workout.findMany();
};

export const createWorkout = async (workoutData: Prisma.WorkoutCreateInput) => {
  const timestamp = new Date().toISOString();

  return await prisma.workout.create({
    data: {
      ...workoutData,
      createdAt: timestamp
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
