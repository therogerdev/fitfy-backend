import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";
import * as athleteService from "../../services/athleteService.js";
import { createAthleteSchema } from "../../validation/athleteValidation.js";

export const createAthlete = catchAsync(async (req:Request, res:Response) => {
  const athleteData = req.body;

  const validatedAthlete = createAthleteSchema.parse(athleteData);

  const athlete = await athleteService.createAthlete(validatedAthlete);

  res.json(athlete);
});
