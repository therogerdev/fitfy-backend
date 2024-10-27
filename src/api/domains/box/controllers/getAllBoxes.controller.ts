
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import prisma from "../../../prismaClient.js";
import ApiError from "../../../utils/ApiError.js";


export const getAllBoxes = catchAsync(async (req, res) => {
    const boxes = await prisma.box.findMany();

    if (!boxes) {
      throw new ApiError(httpStatus.NOT_FOUND, "Box not found");
    }

    res.json(boxes);
  });
