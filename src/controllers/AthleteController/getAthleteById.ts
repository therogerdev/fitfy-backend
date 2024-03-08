import httpStatus from "http-status";
import prisma from "../../prismaClient.js";
import ApiError from "../../utils/ApiError.js";
import catchAsync from "../../middleware/catchAsync.js";

export const getAthleteById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const athlete = await prisma.athlete.findUnique({
      where: {
        id: id
      }
    });

    if (!athlete) {
      throw new ApiError(httpStatus.NOT_FOUND, "Athlete not found");
    }

    res.json(athlete);
  });
