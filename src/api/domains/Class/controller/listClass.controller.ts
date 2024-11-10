import { Request, Response } from "express";
import httpStatus from "http-status";
import logger from "../../../../config/logger.js";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import {
  formatSuccessResponseWithPagination
} from "../../../../utils/formatSuccessResponse.js";
import { listClassService } from "../service/listClass.service.js";

export const listClass = catchAsync(async (req: Request, res: Response) => {
  const { skip, take, cursor, orderBy, startTime, endTime } = req.query;

  // Log the incoming request query parameters
  logger.info("Received request to list classes", { query: req.query });

  const dateRange =
    startTime && endTime
      ? {
          startTime: new Date(startTime as string),
          endTime: new Date(endTime as string)
        }
      : undefined;

  // Call the service to get classes based on the query parameters
  const classes = await listClassService({
    skip: Number(skip) || 0,
    take: Number(take) || 10,
    cursor: cursor ? { id: String(cursor) } : undefined,
    orderBy: orderBy ? JSON.parse(orderBy as string) : undefined,
    dateRange
  });

  if (!classes) {
    throw new ApiError(httpStatus.NOT_FOUND, "No classes found");
  }

  // Return the fetched classes
  logger.info("Successfully fetched classes", { classesCount: classes.totalCount + "classes" });

  const formattedResponse = formatSuccessResponseWithPagination(
    classes.classes,
    "class",
    {
      currentPage: classes.currentPage,
      totalPages: classes.totalPages,
      totalCount: classes.totalCount,
      rowsPerPage: classes.rowsPerPage
    }
  );

  res.status(httpStatus.OK).json(formattedResponse);
});
