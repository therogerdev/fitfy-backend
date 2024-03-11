import catchAsync from "../../middleware/catchAsync.js";
import * as programService from "../../services/programService.js";
import { Request, Response } from "express";
import ApiError from "../../utils/ApiError.js";
import httpStatus from "http-status";
export const getAllPrograms = catchAsync(async (req: Request, res: Response) => {
  const programs = await programService.getAllPrograms();

  if (!programs) {
    throw new ApiError(httpStatus.NOT_FOUND, "No programs found");
  }

  res.json({ total: programs.length, programs });
});

export const createProgram = catchAsync(async (req: Request, res: Response) => {
  const program = await programService.createProgram(req.body);

  if (!program) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Program not created");
  }
  res.json(program);
});
