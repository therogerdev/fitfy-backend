import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import { formatSuccessResponse } from "../../../utils/formatSuccessResponse.js";
import prisma from "../../../prismaClient.js";
import ApiError from "../../../utils/ApiError.js";

export const createPerformance = catchAsync(async (req: Request, res: Response) => {
  const { athleteId, movementId, workoutId, classId, date, sets, reps, weight, weightUnit, notes } =
    req.body;

  const athleteExists = await prisma.athlete.findUnique({
    where: { id: athleteId }
  });

  if (!athleteExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Athlete does not exist");
  }

  // Call the service to create a performance record
  const performance = await createPerformanceService({
    athleteId,
    movementId,
    workoutId,
    classId,
    date,
    sets,
    reps,
    weight,
    weightUnit,
    notes
  });

  const formattedResponse = formatSuccessResponse(performance, "performance");

  res.status(httpStatus.CREATED).json(formattedResponse);
});

interface CreatePerformanceInput {
  athleteId: string;
  movementId: string;
  workoutId?: string;
  classId?: string;
  date: Date;
  sets?: string;
  reps?: string;
  weight?: string;
  weightUnit?: string;
  notes?: string;
}

export const createPerformanceService = async (input: CreatePerformanceInput) => {
  const { athleteId, movementId, workoutId, classId, date, sets, reps, weight, weightUnit, notes } =
    input;

  // Create the performance record in the database
  const performance = await prisma.performance.create({
    data: {
      athleteId,
      movementId,
      workoutId,
      classId,
      date,
      sets,
      reps,
      weight,
      weightUnit,
      notes
    },
    include: {
      movement: true
    }
  });

  return performance;
};
