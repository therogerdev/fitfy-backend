import { PrismaClient, Athlete } from "@prisma/client";
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

export const getAthleteByEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const athlete = await prisma.athlete.findUnique({
    where: {
      email
    }
  });
  res.json(athlete);
});

export const createAthlete = catchAsync(async (req, res) => {
  const { firstName, lastName, email, isCoach, isOwner, } = req.body;

  const existingAthlete = await prisma.athlete.findUnique({
    where: {
      email
    }
  });

  if (existingAthlete) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Athlete with this email already exists");
  }

  const athlete = await prisma.athlete.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      isCoach: isCoach,
      isOwner: isOwner,
      gender: "male",
      profileImageUrl: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
    }
  });
  res.json(athlete);
});
