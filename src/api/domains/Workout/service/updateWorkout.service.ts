import { z } from "zod";
import { Prisma } from "@prisma/client";
import prisma from "../../../prismaClient.js";
import { workoutIdSchema } from "../validation/workout.schema.js";

export type WorkoutId = z.infer<typeof workoutIdSchema>;

export const updateWorkout = async (id: WorkoutId, updatedWorkout: Prisma.WorkoutUpdateInput) => {
  return await prisma.workout.update({
    where: {
      id: id
    },
    data: updatedWorkout
  });
};
