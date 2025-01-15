import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import { cancelCheckService } from "../service/cancelCheck.service.js";
import { checkInToClassService } from "../service/checkIn.service.js";

export const cancelCheckIn = catchAsync(async (req: Request, res: Response) => {
  const { enrollmentId } = req.params;

  if (!enrollmentId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "enrollmentId Id missing");
  }

  const enrollment = await checkInToClassService(enrollmentId);

  if (!enrollment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  if (enrollment.isCheckedIn) {
    const cancelCheckIn = cancelCheckService(enrollmentId);
    const formattedResponse = formatSuccessResponse(cancelCheckIn, "attendance");
    res.status(httpStatus.OK).json(formattedResponse);
  }

  if (!enrollment.checkInAt) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Athlete is Not checked in");
  }
});
