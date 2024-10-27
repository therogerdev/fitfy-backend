import { z } from "zod";
import prisma from "../../../../prismaClient.js";
import { workoutIdSchema } from "../validation/workout.schema.js";





export type WorkoutId = z.infer<typeof workoutIdSchema>;



export const listWorkout = async () => {
    return await prisma.workout.findMany();
  };
