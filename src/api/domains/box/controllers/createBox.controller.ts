import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../../middleware/catchAsync.js";
import ApiError from "../../../../utils/ApiError.js";
import * as boxService from "../services/createBox.service.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

export const createBox = catchAsync(async (req: Request, res: Response) => {
  const boxData = req.body;

  const box = await boxService.createBox(boxData);

  if (!box) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Box could not be created");
  }

  const formattedResponse = formatSuccessResponse(box, "box");

  res.status(httpStatus.OK).json(formattedResponse);
});
