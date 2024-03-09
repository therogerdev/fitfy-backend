import catchAsync from "../../middleware/catchAsync.js";
import * as athleteService from "../../services/athleteService.js";
import { Request, Response } from "express";

export const getAllAthletes = catchAsync(async (req: Request, res: Response) => {
  const athlete = await athleteService.getAllAthletes();
  res.json(athlete);
});
