import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import { createWorkoutSchema } from "../../Movement/schema.js";
import { createWorkoutService } from "../service/createWorkout.service.js";





export const createWorkout = catchAsync(async (req: Request, res: Response) => {
  const workoutData = createWorkoutSchema.parse(req.body);
  const workout = await createWorkoutService(workoutData);
  const formattedResponse = formatSuccessResponse(workout, "workout");
  res.status(httpStatus.CREATED).json(formattedResponse);
});

