import httpStatus from "http-status";

import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";
import { getBoxById } from "./getBoxById.service.js";
import { BoxIdSchema } from "./createBox.service.js";
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
