import catchAsync from "../../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import ApiError from "../../../../utils/ApiError.js";
import * as enrollClassService from "../services/cancelEnrollment.service.js";
import httpStatus from "http-status";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

export const cancelEnrollment = catchAsync(async (req: Request, res: Response) => {
  const { enrollmentId } = req.params;
  const { classId } = req.body;

  if (!enrollmentId) {
    throw new ApiError(400, "Enrollment Id not provided");
  }

  const cancelEnrollment = await enrollClassService.cancelEnrollment(enrollmentId, classId);

  const formattedResponse = formatSuccessResponse(cancelEnrollment, "enrollment")

  res.status(httpStatus.OK).json(formattedResponse);
});
