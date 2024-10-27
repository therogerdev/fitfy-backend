import httpStatus from "http-status";
import { z } from "zod";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";
import { boxIdSchema, createBoxSchema } from "../validation/box.schema.js";

export type CreateBoxData = z.infer<typeof createBoxSchema>;
export type BoxIdSchema = z.infer<typeof boxIdSchema>;



export const createBox = async (data: CreateBoxData) => {
  // Check if the box is not a headquarter and requires a valid headquarter reference
  if (!data.headquarter && !data.headquarterBoxId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "A non-headquarter Box must reference a headquarter."
    );
  }

  // If a headquarterBoxId is provided, verify that the referenced box is a headquarter
  if (data.headquarterBoxId) {
    const headquarterBox = await prisma.box.findUnique({
      where: { id: data.headquarterBoxId },
      select: { headquarter: true } // Explicitly select the `headquarter` field
    });

    // Check if the referenced box exists and is a headquarter
    if (!headquarterBox || !headquarterBox.headquarter) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Referenced Box must be a headquarter.");
    }
  }

  // Proceed to create the Box after passing validation
  return await prisma.box.create({
    data
  });
};
