import catchAsync from "../../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import * as athleteService from "../services/createAthlete.service.js";
import { createAthleteSchema } from "../validation/athlete.schema.js";
import { stripe } from "../../../../integrations/stripe/stripe.js";
import prisma from "../../../../prismaClient.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";

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

  const athleteCreateResponse = formatSuccessResponse(updatedAthlete, "athlete");

  // Send the response with the updated athlete and Stripe customer ID
  res.status(201).json({
    message: "Athlete created successfully",
    athlete: athleteCreateResponse
  });
});
