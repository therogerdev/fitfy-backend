import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import * as classesService from "../service/createClass.service.js";
import { createClassSchema } from "../validation/classSchema.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

export const createClass = catchAsync(async (req: Request, res: Response) => {
  // Get request body
  const classData = req.body;


  console.log("ClassData", classData)

  // Validate the input data
  const parsedClassData = createClassSchema.parse(classData);

  if (!parsedClassData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid class data provided");
  }

  // Call the service to create the class
  const newlyCreatedClass = await classesService.createClass(parsedClassData);

  if (!newlyCreatedClass) {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, "Failed to create class");
  }

  // Format the response and send it
  const formattedClassResponse = formatSuccessResponse(newlyCreatedClass, "class");

  res.status(httpStatus.CREATED).json(formattedClassResponse);
});
