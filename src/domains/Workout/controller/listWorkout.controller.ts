import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import ApiError from "../../../utils/ApiError.js";
import * as workoutService from "../service/listWorkout.service.js";


export const listWorkout = catchAsync(async (req: Request, res: Response) => {
    const workouts = await workoutService.listWorkout();

    if (!workouts) {
      throw new ApiError(httpStatus.NOT_FOUND, "No workouts found");
    }

    res.json({ total: workouts.length, workouts });
  });
