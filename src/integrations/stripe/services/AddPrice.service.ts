import Stripe from "stripe";
import { stripe } from "../stripe.js";

export const AddPriceToProduct = async (data: Stripe.Price) => {
  try {
    const newPrice = await stripe.prices.create({
      unit_amount: 20000,
      currency: "thb",
      product: data.product as string,
      nickname: data.nickname || "",
      recurring: { interval: data.recurring?.interval || "day" }
    });

    return newPrice;
  } catch (error: any | Error) {
    throw new Error(`Failed to create Silver Membership: ${error.message}`);
  }
};
