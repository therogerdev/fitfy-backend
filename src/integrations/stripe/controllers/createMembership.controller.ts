import { Request, Response } from "express";
import catchAsync from "../../../middleware/catchAsync.js";
import * as membershipService from "../services/createMembership.service.js";
import ApiError from "../../../utils/ApiError.js";
import httpStatus from "http-status";

export const createMembership = catchAsync(async (req: Request, res: Response) => {
  const newMembership = await membershipService.createMembership(req.body);

  if(!newMembership) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Membership not created! Something went wrong!")
  }

  res.status(201).json(newMembership);
});
