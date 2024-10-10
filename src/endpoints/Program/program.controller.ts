import catchAsync from "../../middleware/catchAsync.js";
import { Request, Response } from "express";
import ApiError from "../../utils/ApiError.js";
import httpStatus from "http-status";
import * as programService from "./program.service.js";

export const getAllPrograms = catchAsync(async (req: Request, res: Response) => {
  const programs = await programService.getAllPrograms();

  if (!programs) {
    throw new ApiError(httpStatus.NOT_FOUND, "No programs found");
  }

  res.json({ total: programs.length, programs });
});

export const createProgram = catchAsync(async (req: Request, res: Response) => {
  const newProgram = await programService.createProgram(req.body);

  if (!newProgram) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Program not created");
  }
  res.json(newProgram);
});
