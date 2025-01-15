import { Request, Response } from "express";
import Stripe from "stripe";
import catchAsync from "../../../middleware/catchAsync.js";
import { activateMembership } from "../services/updateMembershipStatus.service.js";
import { stripe } from "../stripe.js";
import logger from "../../../config/logger.js";

export const handleStripeWebhook = catchAsync(async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  let event: Stripe.Event;

  try {
    // Verify the webhook signature using the raw body
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);

    logger.info("Stripe Event Received:", { eventType: event.type, eventId: event.id });

    // Handle the event based on its type
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session && session.mode === 'subscription') {
          const stripeSubscriptionId = session.subscription as string;
          const customerEmail = session.customer_email || '';

          // Retrieve line items to get product details
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

          if (lineItems && lineItems.data.length > 0) {
            const item = lineItems.data[0];
            const priceId = item.price?.id;
            const productName = item.description || 'Unknown Product';

            if (priceId && customerEmail) {
              const startDate = new Date();
              const endDate = new Date();
              endDate.setMonth(startDate.getMonth() + 1);

              logger.info(`Activating membership for ${customerEmail} with priceId: ${priceId} and product: ${productName}`);

              // Call service to activate membership and pass the product name
              await activateMembership(productName, customerEmail, priceId, stripeSubscriptionId, startDate, endDate);
            } else {
              logger.error('Missing priceId or customerEmail.');
            }
          } else {
            logger.warn('No line items found.');
          }
        }
        break;
      }
      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    // Send response to Stripe to acknowledge receipt of event
    res.status(200).json({ received: true });
  } catch (err: any) {
    logger.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
