import { Prisma } from "@prisma/client";
import prisma from "../../../prismaClient.js";




export const createWorkout = async (workoutData: Prisma.WorkoutCreateInput) => {
    const timestamp = new Date().toISOString();

    return await prisma.workout.create({
      data: {
        ...workoutData,
        createdAt: timestamp
      }
    });
  };
