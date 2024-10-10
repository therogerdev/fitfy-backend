import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync.js";
import {
  createAthleteSchema,
  deleteAthleteSchema,
  emailSchema,
  getAthleteByIdSchema,
  idSchema,
  updateAthleteSchema
} from "./athlete.schema.js";
import * as athleteService from "./athlete.service.js";
import { Request, Response } from "express";
import ApiError from "../../utils/ApiError.js";

export const getAllAthletes = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query as any;
  const athletes = await athleteService.getAllAthletes({}, parseInt(page), parseInt(limit));
  res.json({ total: athletes.length, athletes });
});

export const getAthleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  // validate id
  const validateId = getAthleteByIdSchema.parse({ id });

  const athlete = await athleteService.getAthleteById(validateId.id);

  if (!athlete) {
    throw new ApiError(httpStatus.NOT_FOUND, "Athlete not found");
  }

  res.json(athlete);
});

export const getAthleteByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;

  // validate id
  const validateEmail = emailSchema.parse(email);

  const athlete = await athleteService.getAthleteByEmail(validateEmail);

  if (!athlete) {
    throw new ApiError(httpStatus.NOT_FOUND, "Athlete not found");
  }

  res.json(athlete);
});

export const deleteAthlete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const validatedId = deleteAthleteSchema.parse(id);

  await athleteService.deleteAthlete(validatedId);

  res.json({ message: "Athlete deleted successfully" });
});

export const createAthlete = catchAsync(async (req: Request, res: Response) => {
  const athleteData = req.body;

  const validatedAthlete = createAthleteSchema.parse(athleteData);

  const athlete = await athleteService.createAthlete(validatedAthlete);

  res.json(athlete);
});

export const updateAthlete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const athleteData = req.body;

  // validate id and user Data
  const validatedId = idSchema.parse(id);
  const userQuery = updateAthleteSchema.parse(athleteData);

  const updatedAthlete = await athleteService.updateAthlete(validatedId, userQuery);

  res.json({
    message: "Athlete updated successfully",
    data: { ...updatedAthlete }
  });
});
