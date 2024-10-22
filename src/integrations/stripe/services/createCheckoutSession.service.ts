// src/services/createCheckoutSession.service.ts

import Stripe from "stripe";
import { stripe } from "../stripe.js";

interface CreatePaymentSessionParams {
  priceId: string; // Stripe Price ID for the selected membership
  successUrl: string; // URL to redirect after successful payment
  cancelUrl: string; // URL to redirect if the user cancels the payment
  customerEmail: string; // Customer's email
}

export const createCheckoutSession = async (
  params: CreatePaymentSessionParams
): Promise<Stripe.Checkout.Session> => {
  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Accepted payment methods
      mode: "subscription", // Subscription-based payment
      line_items: [
        {
          price: params.priceId, // Stripe Price ID for the membership
          quantity: 1 // Quantity of membership
        }
      ],
      customer_email: params.customerEmail  , // User's email
      success_url: "https://6d42-202-44-210-14.ngrok-free.app/api/stripe/checkout/success", // Redirect on success
      cancel_url: params.cancelUrl // Redirect on cancel
    });

    return session; // Return the session object
  } catch (error) {
    console.error("Error creating Stripe Checkout Session:", error);
    throw new Error("Unable to create payment session");
  }
};
