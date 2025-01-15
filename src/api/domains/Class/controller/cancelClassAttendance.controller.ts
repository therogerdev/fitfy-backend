import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import { ClassEnrollmentStatus } from "@prisma/client";

export const cancelClassAttendance = catchAsync((req: Request, res: Response) => {
  const { enrollmentId } = req.params;

  if (!enrollmentId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "enrollment Id missing");
  }

  const cancelCheckin = cancelClassAttendanceService(enrollmentId);

  const formattedResponse = formatSuccessResponse(cancelCheckin, "enrollment");

  res.status(httpStatus.OK).json(formattedResponse);
});

export const cancelClassAttendanceService = async (enrollmentId: string) => {
  return await prisma.classEnrollment.update({
    where: {
      id: enrollmentId,
      status: ClassEnrollmentStatus.ENROLLED
    },
    data: {
      checkInAt: null
    }
  });
};
