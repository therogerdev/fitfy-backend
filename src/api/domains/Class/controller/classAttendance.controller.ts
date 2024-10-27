import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import ApiError from "../../../../utils/ApiError.js";
import prisma from "../../../../prismaClient.js";
import { ClassEnrollmentStatus } from "@prisma/client";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

export const classAttendance = catchAsync((req: Request, res: Response) => {
  const { athleteId } = req.body;
  const { classId } = req.params;

  if (!athleteId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Athlete Id missing");
  }

  const attendance = classAttendanceService(athleteId, classId);

  const formattedResponse = formatSuccessResponse(attendance, "enrollment");

  res.status(httpStatus.OK).json(formattedResponse);
});




export const classAttendanceService = async (athleteId: string, classId: string) => {
  if (!classId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Class Id provided");
  }

  const classDetail = await prisma.class.findFirst({
    where: {
      id: classId
    }
  });

  if (!classDetail) {
      throw new ApiError(httpStatus.BAD_REQUEST, "No Class found");
    }

    //   TODO: logic to avoid check-in after class has started

  const checkIn = await prisma.classEnrollment.updateMany({
    where: {
      athleteId: athleteId,
      status: ClassEnrollmentStatus.ENROLLED
    },
    data: {
      checkInAt: new Date()
    }
  });

  return checkIn;
};
