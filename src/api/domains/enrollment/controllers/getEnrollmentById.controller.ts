import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import { getEnrollmentByIdService } from "../services/getEnrollmentById.service.js";

export const getEnrollmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Enrollment Id not provided");
  }

  const enrollment = await getEnrollmentByIdService(id)

  if (!enrollment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  res.status(httpStatus.OK).json(enrollment);
});
