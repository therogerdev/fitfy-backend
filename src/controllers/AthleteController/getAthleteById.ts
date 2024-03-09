import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import * as athleteService from "../../services/athleteService.js";
import ApiError from "../../utils/ApiError.js";
import { getAthleteByIdSchema } from "../../validation/athleteValidation.js";

export const getAthleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  // validate id
  const validateId = getAthleteByIdSchema.parse({ id });

  const athlete = await athleteService.getAthleteById(validateId.id);

  if (!athlete) {
    throw new ApiError(httpStatus.NOT_FOUND, "Athlete not found");
  }

  res.json(athlete);
});
