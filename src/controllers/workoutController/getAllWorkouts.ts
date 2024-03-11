import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import * as workoutService from "../../services/workoutService.js";
import ApiError from "../../utils/ApiError.js";

export const getAllWorkouts = catchAsync(async (req: Request, res: Response) => {
  const workouts = await workoutService.getAllWorkouts();

  if (!workouts) {
    throw new ApiError(httpStatus.NOT_FOUND, "No workouts found");
  }

  res.json({ total: workouts.length, workouts });
});
