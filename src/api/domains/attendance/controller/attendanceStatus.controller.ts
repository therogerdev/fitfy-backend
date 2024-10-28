import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import { getEnrollmentByIdService } from "../../enrollment/services/getEnrollmentById.service.js";
import { attendanceStatusService } from "../../enrollment/services/attendanceStatus.service.js";

export const attendanceStatus = catchAsync(async (req: Request, res: Response) => {
  const { enrollmentId } = req.params;
  const { status } = req.body;
  if (!enrollmentId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "enrollmentId Id missing");
  }

  const enrollment = await getEnrollmentByIdService(enrollmentId);

  if (!enrollment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  const setStatus = await attendanceStatusService(enrollmentId, status);

  const formattedResponse = formatSuccessResponse(setStatus, "attendance");

  res.status(httpStatus.OK).json(formattedResponse);
});
