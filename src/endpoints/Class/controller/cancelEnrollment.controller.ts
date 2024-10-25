import catchAsync from "../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import ApiError from "../../../utils/ApiError.js";
import * as enrollClassService from "../service/cancelEnrollment.service.js";
import httpStatus from "http-status";

export const cancelEnrollment = catchAsync(async (req: Request, res: Response) => {
  const { enrollmentId } = req.params;
  const { classId } = req.body;

  if (!enrollmentId) {
    throw new ApiError(400, "Enrollment Id not provided");
  }

  const enrollment = await enrollClassService.cancelEnrollment(enrollmentId, classId);

  res.status(httpStatus.OK).json(enrollment);
});
