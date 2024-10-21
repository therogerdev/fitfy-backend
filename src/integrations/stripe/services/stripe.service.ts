import { stripe } from "../stripe.js";

export const stripeService = {
  // Create a checkout session for a membership
  createCheckoutSession: async (priceId: string) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // This corresponds to your Stripe Price ID for the membership
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success`, // Redirect user after success
      cancel_url: `http://localhost:3000/cancel` // Redirect user after cancel
    });

    return session;
  },

  // Handle Stripe webhook events
  handleStripeWebhook: async (payload: any, sig: string | undefined) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
      const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
      return event;
    } catch (err: any | Error) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }
  },

  listStripeProducts: async () => {
    try {
      const products = await stripe.products.list();
      console.log("products", products);
      return products;
    } catch (error) {
      console.error("Error fetching products from Stripe:", error);
      throw error;
    }
  }
};
