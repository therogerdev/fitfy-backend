import { raw, Router } from "express";
import { AddPriceToProduct } from "../integrations/stripe/controllers/addPrice.controller.js";
import { createMembership } from "../integrations/stripe/controllers/createMembership.controller.js";
import { listMembership } from "../integrations/stripe/controllers/listMembership.controller.js";
import { handleStripeWebhook } from "../integrations/stripe/stripe.controller.js";
import { createCheckoutSession } from "../integrations/stripe/controllers/createCheckoutSession.controller.js";

const membershipRouter = Router();

membershipRouter.get("/checkout", createCheckoutSession);

// Route for handling Stripe webhook
membershipRouter.post("/webhook", raw({ type: "application/json" }), handleStripeWebhook);

membershipRouter.post("/products", listMembership);

membershipRouter.post("/membership/create", createMembership);
membershipRouter.post("/membership/price", AddPriceToProduct);

export { membershipRouter };
