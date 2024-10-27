import catchAsync from "../../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import * as athleteService from "../services/deleteAthlete.service.js";
import { deleteAthleteSchema } from "../validation/athlete.schema.js";
import httpStatus from "http-status";

export const deleteAthlete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const validatedId = deleteAthleteSchema.parse(id);

  await athleteService.deleteAthlete(validatedId);

  res.status(httpStatus.OK).json({ message: "Athlete deleted successfully" });
});
