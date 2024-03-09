import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";
import * as athleteService from "../../services/athleteService.js";
import { deleteAthleteSchema } from "../../validation/athleteValidation.js";

export const deleteAthlete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const validatedId = deleteAthleteSchema.parse(id);

  await athleteService.deleteAthlete(validatedId);

  res.json({ message: "Athlete deleted successfully" });
});
