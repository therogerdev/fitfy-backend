import { ClassEnrollmentStatus } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import prisma from "../../../../prismaClient.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

export const listEnrollment = catchAsync(async (req: Request, res: Response) => {
  const { status, status_not } = req.query;
  const { classId } = req.params;

  const enrollList = await listEnrollmentService(
    classId,
    status as ClassEnrollmentStatus | undefined,
    status_not as ClassEnrollmentStatus | undefined
  );

  const formattedResponse = formatSuccessResponse(enrollList, "enrollment");

  res.status(httpStatus.OK).json(formattedResponse);
});

export const listEnrollmentService = async (
  classId: string,
  status?: ClassEnrollmentStatus,
  status_not?: ClassEnrollmentStatus
) => {
  return await prisma.classEnrollment.findMany({
    where: {
      classId: classId,
      ...(status && { status: status }),
      ...(status_not && { status: { not: status_not } })
    },
    include: {
      athlete: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });
};



