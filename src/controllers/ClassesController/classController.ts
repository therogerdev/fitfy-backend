import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";
import * as classService from "../../services/classService.js";


export const getAllClasses = catchAsync(async (req: Request, res: Response) => {
  const classesData = await classService.getAllClasses();

  res.json(classesData);
});
