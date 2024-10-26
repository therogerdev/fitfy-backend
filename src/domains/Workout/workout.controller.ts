import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import { Request, Response } from "express";
import ApiError from "../../utils/ApiError.js";
import * as workoutService from "./workout.service.js";
import { workoutIdSchema } from "./workout.schema.js";

export const getAllWorkouts = catchAsync(async (req: Request, res: Response) => {
  const workouts = await workoutService.getAllWorkouts();

  if (!workouts) {
    throw new ApiError(httpStatus.NOT_FOUND, "No workouts found");
  }

  res.json({ total: workouts.length, workouts });
});

export const createWorkout = catchAsync(async (req: Request, res: Response) => {
  const workoutData = req.body;

  const newWorkout = await workoutService.createWorkout(workoutData);

  res.json(newWorkout);
});

export const deleteWorkout = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const validId = workoutIdSchema.parse(id);

  const deleteWorkout = await workoutService.deleteWorkout(validId);

  if (!deleteWorkout) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong, please try again later");
  }

  res.json({ message: "Workout deleted successfully", data: { title: deleteWorkout.title } });
});

export const updateWorkout = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedWorkout = req.body;

  const workout = await workoutService.updateWorkout(id, updatedWorkout);

  if (!workout) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workout not found");
  }

  res.json(workout);
});
