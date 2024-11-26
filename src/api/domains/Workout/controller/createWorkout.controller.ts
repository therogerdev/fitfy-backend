import { WorkoutIntensity, WorkoutType } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { z } from "zod";
import catchAsync from "../../../../middleware/catchAsync.js";
import prisma from "../../../../prismaClient.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

type CreateWorkoutDTO = {
  title: string;
  type: "ForTime" | "AMRAP" | "EMOM" | "RFT" | "Chipper" | "Ladder" | "Strength" | "Skill";
  duration: number;
  intensity: "Low" | "Moderate" | "High";
  version?: number;
  originalWorkoutId?: string;
  description?: string;
  movements?: {
    movementId: string;
    reps?: number;
    sets?: number;
    weight?: number;
    weightUnit?: string;
  }[];
};


export const createWorkoutSchema = z.object({
  title: z.string(),
  type: z.nativeEnum(WorkoutType),
  duration: z.number(),
  intensity: z.nativeEnum(WorkoutIntensity),
  version: z.number().optional(),
  originalWorkoutId: z.string().optional(),
  description: z.string().optional(),
  movements: z
    .array(
      z.object({
        movementId: z.string(),
        reps: z.number().optional(),
        sets: z.number().optional(),
        weight: z.number().optional(),
        weightUnit: z.string().optional(),
      })
    )
    .optional(),
});

// export const createWorkout = catchAsync(async (req: Request, res: Response) => {
//   const workoutData = req.body;

//   const newWorkout = await workoutService.createWorkoutService(workoutData);

//   res.json(newWorkout);
// });

export const createWorkout = catchAsync(async (req: Request, res: Response) => {
  const workoutData = createWorkoutSchema.parse(req.body);
  const workout = await createWorkoutService(workoutData);
  const formattedResponse = formatSuccessResponse(workout, "workout");
  res.status(httpStatus.CREATED).json(formattedResponse);
});

export const createWorkoutService = async (workoutData: CreateWorkoutDTO) => {
  const { movements, ...workoutDetails } = workoutData;

  // Create workout and movements in a transaction
  return await prisma.$transaction(async (tx) => {
    const workout = await tx.workout.create({
      data: workoutDetails, // Map only the workout fields here
    });

    if (movements && movements.length > 0) {
      await tx.workoutMovements.createMany({
        data: movements.map((movement) => ({
          ...movement,
          workoutId: workout.id, // Associate the created workout
        })),
      });
    }

    return workout;
  });
};