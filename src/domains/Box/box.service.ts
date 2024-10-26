import { z } from "zod";
import httpStatus from "http-status";
import { boxIdSchema, createBoxSchema } from "./box.schema.js";
import prisma from "../../prismaClient.js";
import ApiError from "../../utils/ApiError.js";

type CreateBoxData = z.infer<typeof createBoxSchema>;
type BoxIdSchema = z.infer<typeof boxIdSchema>;

export const createBox = async (data: CreateBoxData) => {
  // Check if the box is not a headquarter and requires a valid headquarter reference
  if (!data.headquarter && !data.headquarterBoxId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "A non-headquarter Box must reference a headquarter.");
  }

  // If a headquarterBoxId is provided, verify that the referenced box is a headquarter
  if (data.headquarterBoxId) {
    const headquarterBox = await prisma.box.findUnique({
      where: { id: data.headquarterBoxId },
      select: { headquarter: true }  // Explicitly select the `headquarter` field
    });

    // Check if the referenced box exists and is a headquarter
    if (!headquarterBox || !headquarterBox.headquarter) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Referenced Box must be a headquarter.");
    }
  }

  // Proceed to create the Box after passing validation
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
