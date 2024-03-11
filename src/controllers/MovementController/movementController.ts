import catchAsync from "../../middleware/catchAsync.js";
import { Request, Response } from "express";
import * as movementService from "../../services/movementService.js";
import ApiError from "../../utils/ApiError.js";
import httpStatus from "http-status";

export const getAllMovements = catchAsync(async (req: Request, res: Response) => {
  const { category } = req.query;

  const movements = await movementService.getAllMovements(category as string);

  if (!movements) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movements not found");
  }

  res.json({ total: movements.length, movements });
});

export const getMovementById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const movement = await movementService.getMovementById(id as string);

  if (!movement) {
    throw new ApiError(httpStatus.NOT_FOUND, "Movement not found");
  }

  res.json(movement);
});
