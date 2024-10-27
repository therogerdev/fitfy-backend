import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import ApiError from "../../../../utils/ApiError.js";
import * as workoutService from "../service/deleteWorkout.service.js";
import { workoutIdSchema } from "..//validation/workout.schema.js";

export const deleteWorkout = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const validId = workoutIdSchema.parse(id);

  const deleteWorkout = await workoutService.deleteWorkout(validId);

  if (!deleteWorkout) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong, please try again later");
  }

  res.json({ message: "Workout deleted successfully", data: { title: deleteWorkout.title } });
});
