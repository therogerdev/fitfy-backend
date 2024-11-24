import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import * as workoutService from "../service/listWorkout.service.js";
import { formatSuccessResponseWithPagination } from "../../../../utils/formatSuccessResponse.js";

export const listWorkout = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  const workoutPagination = await workoutService.listWorkoutService(page, limit);

  if (!workoutPagination.workouts.length) {
    res.status(httpStatus.OK).json({
      success: true,
      type: "workout",
      total: 0,
      data: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        rowsPerPage: limit,
        totalCount: 0,
      },
      meta: { timestamp: new Date().toISOString() },
    });
    return;
  }

  const formattedResponse = formatSuccessResponseWithPagination(
    workoutPagination.workouts,
    "workout",
    {
      currentPage: workoutPagination.currentPage,
      totalPages: workoutPagination.totalPages,
      totalCount: workoutPagination.totalCount,
      rowsPerPage: workoutPagination.rowsPerPage,
    }
  );

  res.status(httpStatus.OK).json(formattedResponse);
});