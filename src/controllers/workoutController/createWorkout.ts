import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";
import * as workoutService from "../../services/workoutService.js";

export const createWorkout = catchAsync(async (req: Request, res: Response) => {
  const workoutData = req.body;


  const newWorkout = await workoutService.createWorkout(workoutData);

  res.json(newWorkout);
});
