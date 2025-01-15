import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import { checkInToClassService } from "../service/checkIn.service.js";
import { getEnrollmentByIdService } from "../../enrollment/services/getEnrollmentById.service.js";
import { ClassEnrollmentStatus } from "@prisma/client";

export const checkInToClass = catchAsync(async (req: Request, res: Response) => {
  const { enrollmentId } = req.params;

  if (!enrollmentId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "enrollmentId Id missing");
  }

  const enrollment = await getEnrollmentByIdService(enrollmentId);

  if (!enrollment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  if (enrollment.isCheckedIn) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Athlete already checked in");
  } else if (!enrollment.isCheckedIn && enrollment.status === ClassEnrollmentStatus.CANCELED) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Enrollment is cancelled");
  }

  if (!enrollment.checkInAt) {
    const checkIn = await checkInToClassService(enrollmentId);
    const formattedResponse = formatSuccessResponse(checkIn, "attendance");
    res.status(httpStatus.OK).json(formattedResponse);
  }
});
