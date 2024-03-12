import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";
import * as boxService from "./box.service.js";
import ApiError from "../../utils/ApiError.js";
import httpStatus from "http-status";
import { boxIdSchema } from "./box.schema.js";
import prisma from "../../prismaClient.js";

export const createBox = catchAsync(async (req: Request, res: Response) => {
  const boxData = req.body;

  const box = await boxService.createBox(boxData);

  if (!box) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Box could not be created");
  }

  res.json(box);
});

export const deleteBox = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const validId = boxIdSchema.parse(id);

  const deletedBox = await boxService.deleteBox(validId);

  if (!deletedBox) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong, please try again later");
  }

  res.json({ message: "Athlete deleted successfully", data: { ...deletedBox } });
});

export const getAllBoxes = catchAsync(async (req, res) => {
  const boxes = await prisma.box.findMany();

  if (!boxes) {
    throw new ApiError(httpStatus.NOT_FOUND, "Box not found");
  }

  res.json(boxes);
});

export const getBoxById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const box = await prisma.box.findUnique({
    where: {
      id: id
    }
  });

  if (!box) {
    throw new ApiError(httpStatus.NOT_FOUND, "Box not found");
  }

  res.json(box);
});

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
