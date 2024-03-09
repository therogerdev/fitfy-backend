import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";
import { boxIdSchema } from "../../validation/boxValidation.js";
import * as boxService from "../../services/boxService.js";
import ApiError from "../../utils/ApiError.js";
import httpStatus from "http-status";
export const deleteBox = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const validId = boxIdSchema.parse(id);

  const deletedBox = await boxService.deleteBox(validId);

  if (!deletedBox) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong, please try again later");
  }

  res.json({ message: "Athlete deleted successfully", data: { ...deletedBox } });
});
