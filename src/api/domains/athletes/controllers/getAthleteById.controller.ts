import catchAsync from "../../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import * as athleteService from "../services/getAthleteById.service.js";
import ApiError from "../../../../utils/ApiError.js";
import httpStatus from "http-status";
import { getAthleteByIdSchema } from "../validation/athlete.schema.js";

export const getAthleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  // validate id
  const validateId = getAthleteByIdSchema.parse({ id });

  const athlete = await athleteService.getAthleteById(validateId.id);

  if (!athlete) {
    throw new ApiError(httpStatus.NOT_FOUND, "Athlete not found");
  }

  res.status(httpStatus.OK).json(athlete);
});
