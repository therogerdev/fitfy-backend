import catchAsync from "../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import * as athleteService from "../services/listAthletes.service.js";
import { formatSuccessResponse } from "../../../utils/formatSuccessResponse.js";
import httpStatus from "http-status";

export const listAthletes = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query as any;
  const athletes = await athleteService.listAthletes(parseInt(page), parseInt(limit));

  const athleteResponse = formatSuccessResponse(athletes, "athlete");

  res.status(httpStatus.OK).json(athleteResponse);
});
