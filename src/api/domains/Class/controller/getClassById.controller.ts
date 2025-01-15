import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import { getClassByIdService } from "../service/getClassById.service.js";

export const getClassById = catchAsync(async (req: Request, res: Response) => {
  // Get request body
  const { classId } = req.params;

  const classObject = await getClassByIdService(classId);

  if (!classObject) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class with selected Id not found");
  }

  // Format the response and send it
  const formattedClassResponse = formatSuccessResponse(classObject, "class");

  res.status(httpStatus.CREATED).json(formattedClassResponse);
});
