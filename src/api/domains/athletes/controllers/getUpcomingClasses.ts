import { Request, Response } from "express";
import catchAsync from "../../../../middleware/catchAsync.js";
import httpStatus from "http-status";
import ApiError from "../../../../utils/ApiError.js";
import * as membershipService from "../services/index.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

export const getUpcomingClasses = catchAsync(async (req: Request, res: Response) => {
  const { athleteId } = req.params;

  if (!athleteId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "athleteId is required");
  }

  const upcomingClasses = (await membershipService.getUpcomingClasses(athleteId, { limit: 3 })) || [];

  // If upcomingClasses is an empty array, set data to null
  const formattedUpcomingClasses = formatSuccessResponse(
    upcomingClasses.length > 0 ? upcomingClasses : null,
    "athlete"
  );

  res.status(httpStatus.OK).json(formattedUpcomingClasses);
});
