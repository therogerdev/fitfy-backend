import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import * as membershipService from "../services/index.js";
export const getAthleteMembership = catchAsync(async (req: Request, res: Response) => {
  const { athleteId } = req.params;

  if (!athleteId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "athleteId is required");
  }

  const membership = await membershipService.getAthleteMembership(athleteId as string);

  // Check if the membership exists
  if (!membership) {
    // Return success with null data
    return res.status(httpStatus.OK).json(formatSuccessResponse(null, ""));
  }

  const membershipResponse = formatSuccessResponse(membership, "membership");

  // If membership exists, return it
  res.status(httpStatus.OK).json(membershipResponse);
});
