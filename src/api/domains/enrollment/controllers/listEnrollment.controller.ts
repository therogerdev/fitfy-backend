import { ClassEnrollmentStatus } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import prisma from "../../../../prismaClient.js";
import {
  formatSuccessResponse
} from "../../../../utils/formatSuccessResponse.js";

export const listEnrollment = catchAsync(async (req: Request, res: Response) => {
  const { status, status_not } = req.query;

  const enrollList = await listEnrollmentService(
    status as ClassEnrollmentStatus | undefined,
    status_not as ClassEnrollmentStatus | undefined
  );

  const formattedResponse = formatSuccessResponse(enrollList, "enrollment");

  res.status(httpStatus.OK).json(formattedResponse);
});

export const listEnrollmentService = async (
  status?: ClassEnrollmentStatus,
  status_not?: ClassEnrollmentStatus
) => {
  return await prisma.classEnrollment.findMany({
    where: {
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

export const listEnrollmentByAthlete = catchAsync(async (req: Request, res: Response) => {
  const { athleteId } = req.params;

  const enrollList = await listEnrollmentByAthleteService(athleteId as string);

  // Customize response to match desired format
  const formattedResponse = {
    success: true,
    type: "enrollment",
    data: enrollList.map(enrollment => ({
      status: enrollment.status,
      ...enrollment.class 
    })),
    pagination: {
      currentPage: 1,
      rowsPerPage: 5
    },
    meta: {
      timestamp: new Date().toISOString()
    }
  };

  res.status(httpStatus.OK).json(formattedResponse);
});

const listEnrollmentByAthleteService = async (athleteId?: string) => {
  return await prisma.classEnrollment.findMany({
    where: {
      athleteId
    },
    select: {
      status: true,
      class: {
        select: {
          id: true,
          name: true,
          startTime: true,
          date: true
        }
      }
    }
  });
};

