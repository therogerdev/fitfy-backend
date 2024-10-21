import Stripe from "stripe";
import { stripe } from "../stripe.js";

export const createMembership = async (data: Stripe.Product) => {
  try {
    const product = await stripe.products.create({
      name: data.name,
      description: data.description || ""
    });
    return {
      data: product
    };
  } catch (error: any | Error) {
    throw new Error(`Failed to create Silver Membership: ${error.message}`);
  }
};
