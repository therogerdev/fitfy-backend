import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import ApiError from "../../../utils/ApiError.js";
import * as boxService from "../services/updateBox.service.js";

export const updateBox = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const boxData = req.body;

    const updatedBox = await boxService.updateBox(id, boxData);

    if (!updatedBox) {
      throw new ApiError(httpStatus.NOT_FOUND, "Box not found, please check the id");
    }

    res.json({
      message: "Box updated successfully",
      data: { ...updatedBox }
    });
  });
