import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import ApiError from "../../../utils/ApiError.js";
import * as classesService from "../service/createClass.service.js";
import { createClassSchema } from "../validation/classSchema.js";
import { formatSuccessResponse } from "../../../utils/formatSuccessResponse.js";

export const createClass = catchAsync(async (req: Request, res: Response) => {
  // get body
  const classData = req.body;

  // validate with classSchema
  const parsedClassData = createClassSchema.parse(classData);

  if (!parsedClassData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid class data provided");
  }
  const newlyCreatedClass = await classesService.createClassService(parsedClassData);

  if (!newlyCreatedClass) {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, "Failed to create class");
  }

  const formattedClassResponse = formatSuccessResponse(newlyCreatedClass, "class");

  res.status(httpStatus.CREATED).json(formattedClassResponse);
});
