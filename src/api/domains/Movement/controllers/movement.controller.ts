import catchAsync from "../../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import * as movementService from "../services/movement.service.js";
import ApiError from "../../../../utils/ApiError.js";
import httpStatus from "http-status";
import { movementIdSchema } from "../movement.schema.js";
import { MovementType } from "@prisma/client";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

export const getAllMovements = catchAsync(async (req: Request, res: Response) => {
  const { category } = req.query;

  const movements = await movementService.getAllMovements(category as MovementType);

  if (!movements) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movements not found");
  }

  const formattedResponse = formatSuccessResponse(movements, "movement");

  res.status(httpStatus.OK).json(formattedResponse);
});

export const getMovementById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const validId = movementIdSchema.parse(id);

  const movement = await movementService.getMovementById(validId);

  if (!movement) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movement not found");
  }

  const formattedResponse = formatSuccessResponse(movement, "movement");

  res.status(httpStatus.OK).json(formattedResponse);
});

export const createManyMovements = catchAsync(async (req: Request, res: Response) => {
  const movements = await movementService.createManyMovements();

  const formattedResponse = formatSuccessResponse(movements, "movement");

  res.status(httpStatus.OK).json(formattedResponse);
});
