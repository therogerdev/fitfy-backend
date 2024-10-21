import { raw, Router } from "express";
import {
  createCheckoutSession,
  listStripeProducts,
  handleStripeWebhook
} from "../integrations/stripe/stripe.controller.js";
import { createMembership } from "../integrations/stripe/controllers/createMembership.controller.js";
import { AddPriceToProduct } from "../integrations/stripe/controllers/addPrice.controller.js";

const membershipRouter = Router();

membershipRouter.get("/checkout", createCheckoutSession);

// Route for handling Stripe webhook
membershipRouter.post("/webhook", raw({ type: "application/json" }), handleStripeWebhook);

membershipRouter.post("/products", listStripeProducts);

membershipRouter.post("/membership/create", createMembership);
membershipRouter.post("/membership/price", AddPriceToProduct);

export { membershipRouter };
