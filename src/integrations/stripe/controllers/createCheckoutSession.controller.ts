import { Request, Response } from "express";
import catchAsync from "../../../middleware/catchAsync.js";
import ApiError from "../../../utils/ApiError.js";
import * as createCheckoutSessionService from "../services/createCheckoutSession.service.js";

export const createCheckoutSession = catchAsync(async (req: Request, res: Response) => {
  const { priceId, customerEmail } = req.body;

  // Define the success and cancel URLs
  const successUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/checkout/success`;
  const cancelUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/checkout/cancel`;

  // Validate the input
  if (!priceId || !customerEmail) {
    throw new ApiError(400, "Missing required parameters: priceId or customerEmail");
  }

  try {
    const session = await createCheckoutSessionService.createCheckoutSession({
      priceId,
      successUrl,
      cancelUrl,
      customerEmail
    });

    // Send the session ID and URL for frontend redirection
    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new ApiError(500, "Failed to create payment session");
  }
});
