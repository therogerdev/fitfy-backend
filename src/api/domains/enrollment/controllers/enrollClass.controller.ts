import { ClassEnrollmentStatus } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import * as enrollClassService from "../services/enrollClass.service.js";

export const enrollClass = catchAsync(async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { athleteId } = req.body;

  const data = {
    classId,
    athleteId,
    id: "", //ID PLACEHOLDER
    checkInAt: null,
    status: ClassEnrollmentStatus.ENROLLED,
    createdAt: "" as unknown as Date,
    updatedAt: "" as unknown as Date,
    attendanceStatus: null,
    isCheckedIn: false
  };

  if (!classId) {
    throw new ApiError(httpStatus.PARTIAL_CONTENT, "Class Id not provided");
  }

  if (!athleteId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You need Athlete Id to enroll to this class");
  }

  const enroll = await enrollClassService.enrollClass(data);

  const formattedEnrollment = formatSuccessResponse(enroll, "enrollment");

  res.status(httpStatus.CREATED).json(formattedEnrollment);
});
