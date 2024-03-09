import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";

export const deleteBox = catchAsync(async (req: Request, res: Response) => {

  res.json({ message: "Athlete deleted successfully" });
});
