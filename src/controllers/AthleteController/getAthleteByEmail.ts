import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import * as athleteService from "../../services/athleteService.js";
import ApiError from "../../utils/ApiError.js";
import { emailSchema } from "../../validation/athleteValidation.js";

export const getAthleteByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;

  // validate id
  const validateEmail = emailSchema.parse(email);

  const athlete = await athleteService.getAthleteByEmail(validateEmail);

  if (!athlete) {
    throw new ApiError(httpStatus.NOT_FOUND, "Athlete not found");
  }

  res.json(athlete);
});
