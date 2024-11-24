import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import { getEnrollmentByIdService } from "../../enrollment/services/getEnrollmentById.service.js";
import { attendanceStatusService } from "../../enrollment/services/attendanceStatus.service.js";
import logger from "../../../../config/logger.js";

export const attendanceStatus = catchAsync(async (req: Request, res: Response) => {
  const { enrollmentId } = req.params;
  const { status } = req.body;

  logger.info("Attendance status update initiated", enrollmentId, status);



  if (!enrollmentId) {
    logger.error("Missing enrollmentId in request");
    throw new ApiError(httpStatus.BAD_REQUEST, "enrollmentId missing");
  }

  const enrollment = await getEnrollmentByIdService(enrollmentId);

  if (!enrollment) {
    logger.error("Enrollment not found", { enrollmentId });
    throw new ApiError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  logger.info("Enrollment retrieved successfully", enrollmentId, enrollment);

  const setStatus = await attendanceStatusService(enrollmentId, status);

  logger.info("Attendance status updated", { enrollmentId, status: setStatus });

  const formattedResponse = formatSuccessResponse(setStatus, "attendance");

  res.status(httpStatus.OK).json(formattedResponse);

  logger.info("Attendance status response sent", { enrollmentId, status: setStatus });
});
