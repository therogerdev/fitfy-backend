import catchAsync from "../../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import * as athleteService from "../services/listAthletes.service.js";
import { formatSuccessResponseWithPagination } from "../../../../utils/formatSuccessResponse.js";
import httpStatus from "http-status";


export const listAthletes = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, isCoach } = req.query as any;

  console.log(req.query)
  // Parse the isCoach query parameter to a boolean if it exists
  const isCoachBoolean = isCoach !== undefined ? isCoach === 'true' : undefined;

  const athletes = await athleteService.listAthleteService(
    parseInt(page),
    parseInt(limit),
    isCoachBoolean
  );

  const athleteResponse = formatSuccessResponseWithPagination(
    athletes.athletes,
    "athlete",
    {
      currentPage: athletes.currentPage,
      totalPages: athletes.totalPages,
      totalCount: athletes.totalCount,
      rowsPerPage: athletes.rowsPerPage

    }
  );
  res.status(httpStatus.OK).json(athleteResponse);
});
