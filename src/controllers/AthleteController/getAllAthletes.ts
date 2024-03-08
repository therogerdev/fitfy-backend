import catchAsync from "../../middleware/catchAsync.js";
import prisma from "../../prismaClient.js";


export const getAllAthletes = catchAsync(async (req, res) => {
    const athlete = await prisma.athlete.findMany();
    res.json(athlete);
  });
