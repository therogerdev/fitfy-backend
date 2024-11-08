import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../utils/ApiError.js";
import catchAsync from "../../../middleware/catchAsync.js";
import { listMembershipService } from "../services/listMembership.service.js";
import { formatSuccessResponse } from "../../../utils/formatSuccessResponse.js";

export const listMembership = catchAsync(async (req: Request, res: Response) => {
  const { athleteId } = req.params;

  if (!athleteId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "athleteId is required");
  }

  const membership = await listMembershipService(athleteId as string);

  // Check if the membership exists
  if (!membership) {
    // Return success with null data
    return res.status(httpStatus.OK).json(formatSuccessResponse(null, ""));
  }


  const membershipResponse = formatSuccessResponse(membership, "membership");


  // If membership exists, return it
  res.status(httpStatus.OK).json(membershipResponse);
});
