import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import * as workoutService from "../service/updateWorkout.service.js";

export const updateWorkout = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedWorkout = req.body;

  const workout = await workoutService.updateWorkout(id, updatedWorkout);

  if (!workout) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workout not found");
  }

  res.json(workout);
});
