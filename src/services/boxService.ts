import { z } from "zod";
import prisma from "../prismaClient.js";
import { boxIdSchema, createBoxSchema } from "../validation/boxValidation.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

type CreateBoxData = z.infer<typeof createBoxSchema>;
type BoxIdSchema = z.infer<typeof boxIdSchema>;

export const createBox = async (data: CreateBoxData) => {
  return await prisma.box.create({
    data
  });
};

export const updateBox = async (id: BoxIdSchema, data: CreateBoxData) => {
  const box = await getBoxById(id);

  if (!box) {
    throw new ApiError(httpStatus.NOT_FOUND, "Box not found, please provide a valid id");
  }

  return await prisma.box.update({
    where: { id },
    data
  });
};

export const getBoxById = async (id: BoxIdSchema) => {
  return await prisma.box.findUnique({
    where: { id }
  });
};

export const deleteBox = async (id: BoxIdSchema) => {
  const box = await getBoxById(id);

  if (!box) {
    throw new ApiError(httpStatus.NOT_FOUND, "Box not found, please provide a valid id");
  }

  if (box) {
    return await prisma.box.delete({
      where: {
        id
      }
    });
  }
};
