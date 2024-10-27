import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import { ClassEnrollmentStatus } from "@prisma/client";
import prisma from "../../../prismaClient.js";
import { formatSuccessResponse } from "../../../utils/formatSuccessResponse.js";

export const listEnrollment = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.query;

  const enrollList = await listEnrollmentService(status as ClassEnrollmentStatus);

  const formattedResponse = formatSuccessResponse(enrollList, "enrollment");

  res.status(httpStatus.OK).json(formattedResponse);
});

export const listEnrollmentService = async (status: ClassEnrollmentStatus) => {
  return await prisma.classEnrollment.findMany({
    where: {
      status: status
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
