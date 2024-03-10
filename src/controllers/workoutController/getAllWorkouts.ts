import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import * as workoutService from "../../services/workoutService.js";
import ApiError from "../../utils/ApiError.js";
import { workoutFilterSchema } from "../../validation/workoutValidation.js";

export const getAllWorkouts = catchAsync(async (req: Request, res: Response) => {
  const { filter } = req.body;

  const validatedFilter = workoutFilterSchema.parse(filter);

  const workouts = await workoutService.getAllWorkouts(validatedFilter);

  if (!workouts) {
    throw new ApiError(httpStatus.NOT_FOUND, "No workouts found");
  }

  res.json({total: workouts.length, workouts});
});
