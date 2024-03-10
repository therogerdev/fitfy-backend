import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";
import * as workoutService from "../../services/workoutService.js";
import { workoutSchema } from "../../validation/workoutValidation.js";

export const createWorkout = catchAsync(async (req: Request, res: Response) => {
  const workoutData = req.body;

  const validatedWorkout = workoutSchema.parse(workoutData);

  const newWorkout = await workoutService.createWorkout(validatedWorkout);

  res.json(newWorkout);
});
