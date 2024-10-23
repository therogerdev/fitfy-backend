import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import * as classesService from "../service/listClasses.service.js";
import { formatSuccessResponse } from "../../../utils/formatSuccessResponse.js";

export const listClasses = catchAsync(async (req: Request, res: Response) => {
  const params = req.query;
  const classes = await classesService.listClasses(params);

  const formattedResponse = formatSuccessResponse(classes, "class");

  res.status(httpStatus.OK).json(formattedResponse);
});
