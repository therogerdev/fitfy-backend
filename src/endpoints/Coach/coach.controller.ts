import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import ApiError from "../../utils/ApiError.js";
import * as coachService from "./coach.service.js";
import { Prisma } from "@prisma/client";

export const getAllCoaches = catchAsync(async (req: Request, res: Response) => {
  const { speciality } = req.query;

  const coaches = await coachService.getAllCoaches(
    speciality as Prisma.CoachWhereInput["speciality"]
  );

  if (!coaches) {
    throw new ApiError(httpStatus.NOT_FOUND, "No coaches found");
  }

  res.json(coaches);
});

export const getCoachById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const coach = await coachService.getCoachById(id);

  if (!coach) {
    throw new ApiError(httpStatus.NOT_FOUND, "Coach not found");
  }

  res.json(coach);
});

export const createCoach = catchAsync(async (req: Request, res: Response) => {
  const coach = await coachService.createCoach(req.body);

  if (!coach) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Coach not created");
  }

  res.status(httpStatus.CREATED).json(coach);
});
