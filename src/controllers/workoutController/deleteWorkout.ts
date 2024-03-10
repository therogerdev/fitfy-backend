import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import * as workoutService from "../../services/workoutService.js";
import ApiError from "../../utils/ApiError.js";
import { workoutIdSchema } from "../../validation/workoutValidation.js";

export const deleteWorkout = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const validId = workoutIdSchema.parse(id);

  const deleteWorkout = await workoutService.deleteWorkout(validId);

  if (!deleteWorkout) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong, please try again later");
  }

  res.json({ message: "Athlete deleted successfully", data: { ...deleteWorkout } });
});
