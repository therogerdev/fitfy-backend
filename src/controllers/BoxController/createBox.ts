import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";

export const createBox = catchAsync(async (req: Request, res: Response) => {
  res.json("createBox");
});
