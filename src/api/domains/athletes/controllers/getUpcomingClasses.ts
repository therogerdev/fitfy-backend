import { Request, Response } from "express";
import catchAsync from "../../../../middleware/catchAsync.js";
import httpStatus from "http-status";
import ApiError from "../../../../utils/ApiError.js";
import { getUpcomingClassesService } from "../services/getUpcomingClassesService.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

export const getUpcomingClasses = catchAsync(async (req: Request, res: Response) => {
  const { athleteId } = req.params;

  if (!athleteId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "athleteId is required");
  }

  const upcomingClasses = await getUpcomingClassesService(athleteId, { limit: 3 });


  if (!upcomingClasses) {
    throw new ApiError(httpStatus.NOT_FOUND, "No upcoming classes found");
  }

  const formattedUpcomingClasses = formatSuccessResponse(upcomingClasses, "athlete")

  res.status(httpStatus.OK).json(formattedUpcomingClasses);
});
