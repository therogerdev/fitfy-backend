import { PrismaClient } from "@prisma/client";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";

const prisma = new PrismaClient();

export const getAllAthletes = catchAsync(async (req, res) => {
  const athlete = await prisma.athlete.findMany();
  res.json(athlete);
});


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
