// src/integrations/stripe/stripe.controller.ts

import { Request, Response } from "express";
import { stripeService } from "./services/stripe.service.js";
import ApiError from "../../utils/ApiError.js";
import catchAsync from "../../middleware/catchAsync.js";

// Create a checkout session
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.body; // The priceId for the membership from Stripe

    const session = await stripeService.createCheckoutSession(priceId);
    res.json({ sessionId: session.id });
  } catch (error) {
    throw new ApiError(400, "Failed to create checkout session");
  }
};

// Handle Stripe webhook for events like successful payment
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  const payload = req.body;

  try {
    const event = await stripeService.handleStripeWebhook(payload, sig);

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // Handle post-payment actions (e.g., activate user's membership)
    }

    res.json({ received: true });
  } catch (error) {
    throw new ApiError(400, "Webhook handling failed");
  }
};

export const listStripeProducts = catchAsync(async (req: Request, res: Response) => {
  try {
    const products = await stripeService.listStripeProducts();
    res.json({ total: products.data.length, products });
  } catch (error) {
    throw new ApiError(400, "Failed to fetch Stripe products");
  }
});
