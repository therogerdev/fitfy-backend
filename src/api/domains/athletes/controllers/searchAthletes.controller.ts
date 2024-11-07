import { Request, Response } from "express";
import catchAsync from "../../../../middleware/catchAsync.js";
import httpStatus from "http-status";
import { searchAthleteService } from "../services/searchAthletes.service.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

export const searchAthlete = catchAsync(async (req: Request, res: Response) => {
  const { name, skip, take, orderBy } = req.query as any;

  const searchAthlete = await searchAthleteService({ name, skip, take, orderBy });

  const formattedResponse = formatSuccessResponse(searchAthlete, "athlete");

  res.status(httpStatus.OK).json(formattedResponse);
});
