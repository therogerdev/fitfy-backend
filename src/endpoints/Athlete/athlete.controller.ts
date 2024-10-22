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
import { stripe } from "../../integrations/stripe/stripe.js";
import prisma from "../../prismaClient.js";

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

  // Validate incoming athlete data
  const validatedAthlete = createAthleteSchema.parse(athleteData);

  // Create athlete in your database
  const athlete = await athleteService.createAthlete(validatedAthlete);

  // Check if customer already exists on Stripe by email
  const existingCustomerList = await stripe.customers.list({
    email: athlete.email,
    limit: 1
  });

  // Initialize stripeCustomer with either existing or new customer
  let stripeCustomer = existingCustomerList.data.length > 0 ? existingCustomerList.data[0] : null;

  // If customer does not exist, create a new one
  if (!stripeCustomer) {
    stripeCustomer = await stripe.customers.create({
      name: `${athlete.firstName} ${athlete.lastName}`,
      email: athlete.email
    });
  }

  // Update the athlete with the Stripe customer ID
  const updatedAthlete = await prisma.athlete.update({
    where: { id: athlete.id },
    data: {
      stripeCustomerId: stripeCustomer.id
    }
  });

  // Send the response with the updated athlete and Stripe customer ID
  res.status(201).json({
    message: "Athlete created successfully",
    athlete: updatedAthlete
  });
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
