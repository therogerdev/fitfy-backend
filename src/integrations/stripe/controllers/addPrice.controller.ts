import { Request, Response } from "express";
import catchAsync from "../../../middleware/catchAsync.js";
import { stripe } from "../stripe.js";
import ApiError from "../../../utils/ApiError.js";
import httpStatus from "http-status";

export const AddPriceToProduct = catchAsync(async (req: Request, res: Response) => {
  const newPrice = req.body;

  const AddPrice = await stripe.prices.create({
    currency: "thb",
    product: newPrice.productId,
    unit_amount: newPrice.price,
    recurring: { interval: newPrice.interval },
    nickname: newPrice.nickname
  });

  if (!newPrice.price || !newPrice.productId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Price or product id is required");
  }

  res.status(200).json(AddPrice);
});
