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

  const { firstName, lastName, email } = validatedAthlete;

  const transactionResult = await prisma.$transaction(async (prisma) => {
    // Create the athlete in the database
    const athlete = await athleteService.createAthlete(validatedAthlete);

    // Check if a Stripe customer already exists for this email
    const existingCustomerList = await stripe.customers.list({
      email,
      limit: 1,
    });

    let stripeCustomer = existingCustomerList.data.length > 0 ? existingCustomerList.data[0] : null;

    // If no existing Stripe customer, create one
    if (!stripeCustomer) {
      stripeCustomer = await stripe.customers.create({
        name: `${firstName} ${lastName}`,
        email,
      });
    }

    // Update the athlete record with the Stripe customer ID
    const updatedAthlete = await prisma.athlete.update({
      where: { id: athlete.id },
      data: {
        stripeCustomerId: stripeCustomer.id,
      },
    });

    return updatedAthlete; // Return the updated athlete
  });

  // Format the response
  const athleteCreateResponse = formatSuccessResponse(transactionResult, "athlete");

  // Send the response
  res.status(201).json({
    message: "Athlete created successfully",
    athlete: athleteCreateResponse,
  });
});