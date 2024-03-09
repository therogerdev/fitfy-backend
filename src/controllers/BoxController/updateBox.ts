import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";

export const updateBox = catchAsync(async (req: Request, res: Response) => {
    res.json("updateBox");
});
