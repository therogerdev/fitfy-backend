import { ClassEnrollmentStatus } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import ApiError from "../../../utils/ApiError.js";
import { formatSuccessResponse } from "../../../utils/formatSuccessResponse.js";
import * as enrollClassService from "../service/enrollClass.service.js";

export const enrollClass = catchAsync(async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { athleteId } = req.body;

  const data = {
    classId,
    athleteId,
    id: "", //ID PLACEHOLDER
    checkInAt: null,
    status: ClassEnrollmentStatus.ENROLLED
  };

  if (!classId) {
    throw new ApiError(httpStatus.PARTIAL_CONTENT, "Class Id not provided");
  }

  const enroll = await enrollClassService.enrollClass(data);

  const formattedEnrollment = formatSuccessResponse(enroll, "enrollment");

  res.status(httpStatus.CREATED).json(formattedEnrollment);
});
