import { Request, Response } from "express";

export const checkoutSuccess = (req: Request, res: Response) => {
  console.log("Checkout Success");
  res.send("Checkout successful!");
};
