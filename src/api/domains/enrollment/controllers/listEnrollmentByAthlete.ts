import { Request, Response } from "express";
import catchAsync from "../../../../middleware/catchAsync.js";
import { listEnrollmentByAthleteService } from "../services/listEnrollmentByAthleteService.js";
import httpStatus from "http-status";

export const listEnrollmentByAthlete = catchAsync(async (req: Request, res: Response) => {
  const { athleteId } = req.params;

  const enrollList = await listEnrollmentByAthleteService(athleteId as string);

  // Customize response to match desired format
  const formattedResponse = {
    success: true,
    type: "enrollment",
    data: enrollList.map((enrollment) => ({
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
