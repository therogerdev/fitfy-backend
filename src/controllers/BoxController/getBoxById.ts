import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import prisma from "../../prismaClient.js";
import ApiError from "../../utils/ApiError.js";

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
