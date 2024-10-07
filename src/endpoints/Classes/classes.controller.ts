import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import ApiError from "../../utils/ApiError.js";
import * as classesService from "./classes.service.js";

export const getAllClasses = catchAsync(async (req: Request, res: Response) => {
  const classes = await classesService.getAllClasses();

  if (!classes) {
    throw new ApiError(httpStatus.NOT_FOUND, "No classes found");
  }

  res.status(httpStatus.OK).json({ total: classes.length, data: classes });
});

export const createClass = catchAsync(async (req: Request, res: Response) => {
  const newClass = await classesService.createClass(req.body);

  res.status(httpStatus.CREATED).json(newClass);
});
