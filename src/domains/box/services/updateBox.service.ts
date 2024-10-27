import httpStatus from "http-status";
import prisma from "../../../prismaClient.js";
import ApiError from "../../../utils/ApiError.js";
import { getBoxById } from "./getBoxById.service.js";
import { BoxIdSchema, CreateBoxData } from "./createBox.service.js";


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
