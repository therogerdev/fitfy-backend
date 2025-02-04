import { raw, Router } from "express";
import { AddPriceToProduct } from "../integrations/stripe/controllers/addPrice.controller.js";
import { createCheckoutSession } from "../integrations/stripe/controllers/createCheckoutSession.controller.js";
import { createMembership } from "../integrations/stripe/controllers/createMembership.controller.js";
import { handleStripeWebhook } from "../integrations/stripe/controllers/handleStripeWebhook.controller.js";
import { checkoutSuccess } from "../integrations/stripe/controllers/checkoutSuccess.controller.js";

const webhookRouter = Router();
webhookRouter.post("/webhook", raw({ type: "application/json" }), handleStripeWebhook);

const membershipRouter = Router();
membershipRouter.post("/checkout", createCheckoutSession);
membershipRouter.get("/checkout/success", checkoutSuccess);

membershipRouter.post("/membership/create", createMembership);
membershipRouter.post("/membership/price", AddPriceToProduct);

export { membershipRouter, webhookRouter };
